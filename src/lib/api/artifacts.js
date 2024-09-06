import { nanoid } from "nanoid";

import lancedb from "./../db/db.js";
import { logger } from "./../logger.js";

export async function createArtifact({ body, dek, hed, path, url }) {
  logger.info(`Creating artifact with path: ${path}`);
  const db = await lancedb;
  const artifactsTable = await db.openTable("artifacts");
  const id = nanoid();
  await artifactsTable.add([
    {
      id,
      created_at: Date.now(),
      body,
      dek,
      hed,
      path,
      type: "document",
      url,
    },
  ]);
  logger.info(`Created artifact with ID: ${id}`);
  return id;
}

export async function readArtifact({ id }) {
  logger.info(`Reading artifact with ID: ${id}`);
  const db = await lancedb;
  const artifactsTable = await db.openTable("artifacts");
  const summariesTable = await db.openTable("summaries");
  const [artifact] = await artifactsTable
    .query()
    .where(`id = '${id}'`)
    .toArray();
  const summaries = await summariesTable
    .query()
    .where(`artifact_id = '${id}'`)
    .toArray();
  return { ...artifact, summaries };
}

export async function readArtifacts({ query }) {
  logger.info(`Reading artifacts with query: ${query}`);
  const db = await lancedb;
  const artifactsTable = await db.openTable("artifacts");
  const summariesTable = await db.openTable("summaries");
  let artifacts;
  artifacts = await artifactsTable.query().toArray();
  const summaries = await summariesTable
    .query()
    .where(
      `artifact_id IN (${artifacts.map(({ id }) => `'${id}'`).join(", ")})`
    )
    .toArray();
  return artifacts.map((artifact) => ({
    ...artifact,
    summaries: summaries.filter(
      ({ artifact_id }) => artifact_id === artifact.id
    ),
  }));
}
