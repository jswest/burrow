import { json } from "@sveltejs/kit";

import { readArtifact } from "$lib/api/artifacts.js";
import lancedb from "$lib/db/db.js";
import { embed, prompt } from "$lib/util.js";

export async function GET({ url }) {
  const db = await lancedb;
  const query = await url.searchParams.get("query");
  const vector = await embed(query);
  const chunksTable = await db.openTable("chunks");
  const chunks = await chunksTable.search(vector).limit(6).toArray();
  const artifacts = [];
  const artifactIds = [...new Set(chunks.map(({ artifact_id }) => artifact_id))];
  for (const id of artifactIds) {
    const artifact = await readArtifact({ id });
    artifacts.push(artifact);
  }
  const idToHed = {};
  for (const chunk of chunks) {
    const artifact = artifacts.find(({ id }) => id === chunk.artifact_id);
    idToHed[chunk.id] = artifact.summaries[0].hed;
  }
  const chunksList = chunks.map(({ body, id }) => `**${idToHed[id]}**\n>${body}`);
  const body = `
    Below is a user query followed by relevant information retrieved from various documents.
    
    Use this information to generate an accurate and verbose essay in response to the user query.
  
    Please be as verbose as possible and provide as much context as possible. You should use multiple paragraphs and markdown.

    Do not repeat the query in your response.

    ---

    **Query:**
    ${query}

    **Context (each source document is listed in bold):**
    ${chunksList.join('\n\n')}
  `;
  const response = await prompt(body);
  return json({artifacts, response});
}
