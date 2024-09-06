# Burrow

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

## Setup

Run these commands:

```bash
node scripts/create-db.js
source .venv/bin/activate # If you haven't already.

# Load PDFs from a directory, recursively.
python scripts/pdfloader.py path/to/pdf/directory
```