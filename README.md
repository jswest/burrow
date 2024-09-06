# Burrow
## Dead-simple RAG for your Markdown documents.

The aim of `burrow` is to allow you to read and search through your documents with ease—and get real answers from an LLM that's read your stuff.

----

## Installation

First, [download](https://ollama.com/download) and install `Ollama`.

Then, run these commands:

```bash
# The various Python packages.
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# The node stuff.
nvm install 20 # If you haven't already.
nvm use 20
npm install

# Other install steps.
ollama create summarizer -f ./Modelfile
```

Finally, download and install the fonts (you don't _need_ to do this, but it'll look mighty weird if you don't):

- [Departure Mono](https://www.departuremono.com/)
- [Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3)
- [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond)

## Setup

Run these commands:

```bash
node scripts/create-db.js
```

## Ingesting files

Run one or both of these commands:

```bash
source .venv/bin/activate # If you haven't already.

# Load PDFs from a directory, recursively.
python scripts/pdfloader.py path/to/pdf/directory

# Load a single Markdown file.
node scripts/create-artifact.js --path=path/to/file.md
```