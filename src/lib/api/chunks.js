import { nanoid } from "nanoid";

import lancedb from "./../db/db.js";
import { logger } from "./../logger.js";
import { embed } from "./../util.js";

export async function chunkText({ text }) {
  logger.info(`Chunking text.`);
  const chunks = [];
  const words = text.split(/\s+/);
  let chunk = [];
  let index = 0;
  for (const word of words) {
    if (chunk.join(" ").length > 500) {
      chunks.push({
        body: chunk.join(" "),
        chunk_index: index,
      });
      chunk = [];
      index++;
    }
    chunk.push(word);
  }
  chunks.push({
    body: chunk.join(" "),
    chunk_index: index,
  });
  logger.info(`Chunked text into ${chunks.length} chunks`);
  return chunks;
}

export async function createChunk({
  artifactId,
  body,
  chunkIndex,
  summaryId,
}) {
  logger.info(`Creating chunk with index: ${chunkIndex}`);
  const db = await lancedb;
  const id = nanoid();
  const vector = await embed(body);
  const chunksTable = await db.openTable("chunks");
  await chunksTable.add([
    {
      id,
      created_at: Date.now(),
      body,
      chunk_index: chunkIndex,
      vector,
      artifact_id: artifactId,
      summary_id: summaryId,
    },
  ]);
  logger.info(`Created chunk with ID: ${id}`);
  return id;
}