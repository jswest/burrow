import { error, json } from "@sveltejs/kit";

import lancedb from "$lib/db/db.js";
import { embed, prompt } from "$lib/util.js";

export async function GET({ url }) {
  const db = await lancedb;
  const query = await url.searchParams.get("query");
  const vector = await embed(query);
  const chunksTable = await db.openTable("chunks");
  const chunks = await chunksTable.search(vector).limit(10).toArray();
  const chunksList = chunks.map(({ body }, index) => `${index + 1}. ${body}}`);
  const body = `
      Below is a user query followed by relevant information retrieved from various documents.
      Use this information to generate a concise and accurate response to the query.

      Please be verbose and provide as much context as possible.

      Do not repeat the query in your response.

      ---

      **Query:**
      ${query}

      **Context:**
      ${chunksList}
    `;
  const response = await prompt(body);
  return json(response);
}
