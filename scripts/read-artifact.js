import { readArtifact } from "../src/lib/api/artifacts.js";

(async () => {
  console.log(await readArtifact({ id: "tmWwCKQsfbuZqszQkkLc2" }));
})();