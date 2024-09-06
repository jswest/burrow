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
  for (let i = 0; i < words.length; i++) {
    if (i % 100 === 0) {
      for (const word of words.slice(i)) {
        if (chunk.join(" ").length > 1000) {
          chunks.push({
            body: chunk.join(" "),
            chunk_index: index,
          });
          chunk = [];
          index++;
          break;
        }
        chunk.push(word);
      }
    }
  }
  if (chunk.length > 0) {
    chunks.push({
      body: chunk.join(" "),
      chunk_index: index,
    });
  }
  logger.info(`Chunked text into ${chunks.length} chunks`);
  return chunks;
}

export async function createChunk({
  artifactId,
  body,
  chunk_index,
  summaryId,
}) {
  logger.info(`Creating chunk with index: ${chunk_index}`);
  const db = await lancedb;
  const id = nanoid();
  const vector = await embed(body);
  const chunksTable = await db.openTable("chunks");
  await chunksTable.add([
    {
      id,
      created_at: Date.now(),
      body,
      chunk_index: chunk_index,
      vector,
      artifact_id: artifactId,
      summary_id: summaryId,
    },
  ]);
  logger.info(`Created chunk with ID: ${id}`);
  return id;
}
