import { ChatPromptTemplate } from "@langchain/core/prompts";
import fs from "fs/promises";
import { llm } from "../config/llm_client.js";

export const generateDetails = async (rawText) => {
  const template = await fs.readFile(
    "./prompts/insightsFromResume.md",
    "utf-8",
  );

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", template],
    ["human", "CV TEXT:\n{RAW_CV_TEXT}"],
  ]);

  const chain = prompt.pipe(llm);

  const response = await chain.invoke({
    RAW_CV_TEXT: rawText,
  });

  return response;
};
