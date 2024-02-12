import { NextResponse } from "next/server";
import Replicate from "replicate";
import clientPromise from "@/utils/mongodb";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MongoClient, ObjectId } from "mongodb";
import fs from "fs";

import { createClient } from 'redis';

const client = await clientPromise;
const db = client.db("visit_tasker");

const genAI = new GoogleGenerativeAI(process.env.BARD_API_KEY);

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
export async function GET() {
  console.log("are you coming here");
  return NextResponse.json({ result: 1 });
}

export async function POST(request) {
  const data = await request.json();

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `You are a helpful, respectful and honest physiotherapist. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.\n\nIf a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information. In the response only mention the treatment and elimate the removing. You can provide me with html or markdown code if you're using any special tag to list or highlight anything. A ${
    data?.gender
  } patient ${data?.age && `of age ${data?.age} and`} ${
    data?.weight && `weight ${data?.weight}`
  } has issue with ${
    data?.reason_for_visit
  }. Can you give me the home experience treatment for ${
    data?.gender === "Male" ? "him" : "her"
  }.`;

  const result = await model.generateContent([prompt]);

  const respForTreatment = result.response.candidates[0].content.parts[0].text;

  await db
    .collection("patient")
    .updateOne(
      { _id: new ObjectId(data._id) },
      { $set: { suggestion_from_ai: respForTreatment } }
    );

  const notification = {
    date: new Date(),
    type: {
      title:"AI patient analysis",
      catagory :'ai',
    },
    message:`AI has generated a tailored treatment protocol for ${data.name}`,
    route:'',
    patient: {
      name: data.name,
      _id: data._id,
    },
    viewed: false,
  };

  await db.collection("notification").insertOne(notification);


  const pub = createClient({
      password: 'SZquEUj3IidpWUzASs1EdwYFqRfZ5Xif',
      socket: {
          host: 'redis-12903.c321.us-east-1-2.ec2.cloud.redislabs.com',
          port: 12903
      }
  });

  await pub.connect();

  await pub.publish('notification', JSON.stringify(notification));

  return NextResponse.json({ result: "AI has updated the document" });
}


export const watchData = async () => {
  try {
    const changeStream = db.collection("notification").watch();
    for await (const change of changeStream) {
      if (change.operationType === 'insert' || change.operationType === 'update') {
        console.log('Data change detected:', change);
        // Process change and create notification (see Trigger Notifications)
      }
    }
  } catch (error) {
    console.error('Error in data watcher:', error);
  } finally {
    // Consider closing the change stream if needed
  }
};