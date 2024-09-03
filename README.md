# Burrow

----

### The data structures

Using LanceDB, I anticipate there being these four tables:

- *Artifacts* are the base unit of this system, representing a PDF document, an HTML website, a Markdown or plain-text file, or a user-generated Markdown note.
- *Summaries* are A.I.-generated blocks of text for each Artifact, which summarize it—as the name suggests.
- *Chunks* are the 400-character chunks (split at the nearest last word before 500 characters) of text representing, rolling every 200 characters, representing every Artifact or Summary. Each has an embedding.
- *Tags* are plaintext tags that a user can assign to each Artifact.