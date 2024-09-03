import {
  Field,
  FixedSizeList,
  Float32,
  Schema,
  TimestampMillisecond,
  Utf8,
} from "apache-arrow";

import lancedb from "./../src/lib/db/db.js";

async function dropExisting(tableName, db) {
  try {
    const existing = await db.openTable(tableName);
    if (existing) {
      await db.dropTable(tableName);
    }
  } catch (error) {
    console.error(error);
  }
}

(async () => {
  const db = await lancedb
  await dropExisting("artifacts", db);
  await dropExisting("summaries", db);
  await dropExisting("chunks", db);

  await db.createEmptyTable(
    "artifacts",
    new Schema([
      new Field("id", new Utf8()),
      new Field("created_at", new TimestampMillisecond()),
      new Field("body", new Utf8()),
      new Field("dek", new Utf8()),
      new Field("hed", new Utf8()),
      new Field("path", new Utf8()),
      new Field("type", new Utf8()),
      new Field("url", new Utf8()),
    ]),
  );
  await db.createEmptyTable(
    "summaries",
    new Schema([
      new Field("id", new Utf8()),
      new Field("created_at", new TimestampMillisecond()),
      new Field("body", new Utf8()),
      new Field("dek", new Utf8()),
      new Field("hed", new Utf8()),
      new Field("artifact_id", new Utf8())
    ]),
  );
  await db.createEmptyTable(
    "chunks",
    new Schema([
      new Field("id", new Utf8()),
      new Field("created_at", new TimestampMillisecond()),
      new Field("body", new Utf8()),
      new Field("chunk_index", new Utf8()),
      new Field(
        "vector",
        new FixedSizeList(768, new Field("item", new Float32(), true))
      ),
      new Field("artifact_id", new Utf8()),
      new Field("summary_id", new Utf8()),
    ]),
  );
  console.log(await db.tableNames());
})();
