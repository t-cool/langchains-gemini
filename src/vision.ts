import fs from "fs";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";

// 環境変数設定
require("dotenv").config();

async function main() {

const vision = new ChatGoogleGenerativeAI({
  modelName: "gemini-pro-vision",
  maxOutputTokens: 2048,
});

//画像のパスを指定
const image = fs.readFileSync("./img/image.jpg").toString("base64");

const input = [
  new HumanMessage({
    content: [
      {
        type: "text",
        text: "この画像について、英語で説明をしてください。",
      },
      {
        type: "image_url",
        image_url: `data:image/png;base64,${image}`,
      },
    ],
  }),
];

// Multi-modal streaming
const res = await vision.stream(input);

for await (const chunk of res) {
  console.log(chunk);
}

}

main()
    .then(() => {
        console.log('ok');
    })
    .catch((e: Error) => {
        console.error(e.message);
        throw e;
    });