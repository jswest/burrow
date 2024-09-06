import { nanoid } from "nanoid";

import lancedb from "./../db/db.js";
import { logger } from "./../logger.js";
import { prompt } from "./../util.js";

export async function createSummary({ artifactId }) {
  logger.info(`Creating summary for artifact with ID: ${artifactId}`);
  const db = await lancedb;
  const id = nanoid();
  const artifactsTable = await db.openTable("artifacts");
  const [artifact] = await artifactsTable
    .query()
    .where(`id = '${artifactId}'`)
    .toArray();

  const chunks = [];
  const words = artifact.body.split(/\s+/);
  for (let i = 0; i < Math.ceil(words.length / 4000); i++) {
    chunks.push(words.slice(i * 4000, (i + 1) * 4000).join(" "));
  }
  let finalTextToSummarize;
  if (chunks.length > 1) {
    const texts = [];
    for (const chunk of chunks) {
      texts.push(await prompt(`Give an extremely detailed summary of the folowing content:\n\n${chunk}`));
    }
    finalTextToSummarize = texts.join("\n\n");
  } else {
    finalTextToSummarize = chunks[0]
  }

  const summariesTable = await db.openTable("summaries");
  const body = (
    await prompt(
      `Give a detailed summary of the following content, and only output the summary without any additional text.\n\n${finalTextToSummarize}`
    )
  ).replace("Here is a detailed summary of the content:\n\n", "");
  const hed = await prompt(
    `Give a pithy title for the following content, and only output the title without any additional text.\n\n${finalTextToSummarize}`
  );
  const dek = await prompt(
    `Give a short summary (max one sentence) for the following content, and only output the short summary without any additional text.\n\n${finalTextToSummarize}`
  );
  await summariesTable.add([
    {
      id,
      created_at: Date.now(),
      body,
      dek,
      hed,
      artifact_id: artifactId,
    },
  ]);
  logger.info(`Created summary with ID: ${id}`);
  return id;
}
