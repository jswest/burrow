import { readFileSync } from "fs";

import ollama from "ollama";

import { logger } from "./logger.js";

// A function to embed a piece of text.
export async function embed(content) {
  logger.info(`Attempting to embed.`);
  try {
    const response = await ollama.embeddings({
      model: "nomic-embed-text",
      prompt: content,
    });
    const { embedding } = response;
    return embedding;
  } catch (error) {
    logger.error(error);
    return false;
  }
}

// A function to load a file from a path.
export async function loadFile(path) {
  logger.info(`Attempting to load file at: ${path}`);
  try {
    const body = readFileSync(path).toString();
    return body;
  } catch (error) {
    logger.error(error);
    return false;
  }
}

// A function to prompt against a LLM.
export async function prompt(body) {
  logger.info(`Attempting to prompt.`);
  try {
    const response = await ollama.chat({
      model: "summarizer",
      messages: [{ role: "user", content: body }],
    });
    const {
      message: { content },
    } = response;
    return content;
  } catch (error) {
    logger.error(error);
    return false;
  }
}
