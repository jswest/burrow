import { json } from "@sveltejs/kit";

import { readArtifact } from "$lib/api/artifacts";

export async function GET({ params }) {
  const artifact = await readArtifact({ id: params.id });
  return json(artifact);
}
