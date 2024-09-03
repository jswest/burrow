import path from "path";

import * as lancedb from "@lancedb/lancedb";

const db = lancedb.connect(path.resolve(import.meta.dirname, "./lancedb"));

export default db;
