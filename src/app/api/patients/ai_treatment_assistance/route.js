import { NextResponse } from "next/server";
import Replicate from "replicate";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const genAI = new GoogleGenerativeAI(process.env.BARD_API_KEY);

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST() {
//   const output = await replicate.run(
//     "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3",
//     {
//       input: {
//         debug: false,
//         top_k: 50,
//         top_p: 1,
//         prompt:
//           "A femal patient of age 52 and weight 70 kg has gone under knee replacement. Can you give me the home experience treatment for her.",
//         temperature: 0.5,
//         system_prompt:
//           "You are a helpful, respectful and honest physiotherapist. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.\n\nIf a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.  In the response only mention the treatment and elimate the removing",
//         // system_prompt:
//         //   "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.\n\nIf a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.",
//         max_new_tokens: 500,
//         min_new_tokens: -1,
//       },
//     }
//   );
//   console.log(output);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const prompt = "You are a helpful, respectful and honest physiotherapist. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.\n\nIf a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.  In the response only mention the treatment and elimate the removing. A femal patient of age 52 and weight 70 kg has gone under knee replacement. Can you give me the home experience treatment for her.";
// const image = {
//   inlineData: {
//     data: Buffer.from(fs.readFileSync("cookie.png")).toString("base64"),
//     mimeType: "image/png",
//   },
// };

const result = await model.generateContent([prompt]);
  return NextResponse.json({result})
}
