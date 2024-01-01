import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

require("dotenv").config();

export const run = async () => {
// Text
const model = new ChatGoogleGenerativeAI({
    modelName: "gemini-pro",
    maxOutputTokens: 2048,
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
      },
    ],
  });

  const res = await model.invoke([
    [
      "human",
      "英語の be 動詞と一般動詞の違いについて教えてください。",
    ],
  ]);

  console.log(res);

};
run();