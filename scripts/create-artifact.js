import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { createArtifact, readArtifact } from "./../src/lib/api/artifacts.js";
import { createChunk, chunkText } from "./../src/lib/api/chunks.js";
import { createSummary } from "./../src/lib/api/summaries.js";
import { loadFile } from "./../src/lib/util.js";

(async () => {
  const { path } = yargs(hideBin(process.argv)).argv;
  const body = await loadFile(path);
  const artifactId = await createArtifact({ body, path });
  if (!artifactId) {
    return;
  }
  const artifactChunks = await chunkText({ text: body });
  for (const chunk of artifactChunks) {
    await createChunk({ artifactId, ...chunk });
  }
  const summaryId = await createSummary({ artifactId });
  const artifact = await readArtifact({ id: artifactId });
  const summary = artifact.summaries.find(({ id }) => id === summaryId);
  const summaryChunks = await chunkText({ text: summary?.body });
  for (const chunk of summaryChunks) {
    await createChunk({ artifactId, ...chunk, summaryId });
  }
})();
