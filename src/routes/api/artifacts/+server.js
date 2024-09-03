import { error, json } from "@sveltejs/kit";

import { loadFile } from "$lib/util.js";
import { createArtifact, readArtifacts } from "$lib/api/artifacts";
import { createSummary } from "$lib/api/summaries";

export async function GET() {
  const artifacts = await readArtifacts({});
  return json(artifacts);
}

export async function POST({ request }) {
  const { path } = await request.json();
  const body = await loadFile(path);
  if (!body) {
    error(500, "Uff da. Couldn't find the file.");
  }
  const artifactId = await createArtifact({ body, path });
  const summaryId = await createSummary({ artifactId });
  return json({ artifactId, summaryId });
}
