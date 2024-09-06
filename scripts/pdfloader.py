from argparse import ArgumentParser
import os
import subprocess
from tqdm import tqdm

parser = ArgumentParser(
    prog='pdfloader',
    description='Load all pdfs from a directory, convert them to Markdown, and import them into the database.'
)
parser.add_argument('base', help='The base directory to pull PDFs from.')
args = parser.parse_args()

if __name__ == "__main__":
    if args.base and os.path.exists(args.base):
        paths = []
        for root, dirs, files in os.walk(args.base):
            for file in files:
                if file.endswith(".pdf"):
                    paths.append(os.path.join(root, file))
        
        for path in tqdm(paths):
            subprocess.run(f"cp '{path}' ./temp/temp.pdf", shell=True)
            subprocess.run(["marker_single" ,"./temp/temp.pdf", "./temp/markdown"])
            subprocess.run(["node", "./scripts/create-artifact.js", f"--path='./temp/markdown/temp/temp.md'"])