import { MongoClient, ObjectId } from "mongodb";
import clientPromise from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generateRandomColor } from "@/utils/utils";

const client = await clientPromise;
const db = client.db("visit_tasker");

export async function GET(request) {
  const requestedId = request.nextUrl.searchParams.get("patient_id");
  console.log(requestedId)
  const allPosts = await db
    .collection("patient")
    .find({
      _id: new ObjectId(requestedId),
    })
    .toArray();
  return NextResponse.json({ status: 200, data: allPosts });
}

const { backgroundColor, textColor } = generateRandomColor();

const formInitalValue = {
  name: "",
  height: "",
  weight: "",
  age: "",
  phone_number: "",
  address: "",
  gender: "",

  reason_for_visit: "",
  past_medical_condition: "",
  surgeries: "",

  fee_per_visit: "",
  payment_frequency: "",
};

export async function POST(request) {
  const data = await request.json();
  const expectedFields = Object.keys(formInitalValue);
  const validFields = Object.keys(data).filter((field) =>
    expectedFields.includes(field)
  );
  const extraFields = Object.keys(data).filter(
    (field) => !expectedFields.includes(field)
  );

  if (extraFields.length > 0) {
    return NextResponse.json(
      { error: "Invalid fields: " + extraFields.join(", ") },
      { status: 400 }
    );
  }

  // Add createdAt and updatedAt fields with current timestamp
  data.createdAt = new Date();
  data.updatedAt = new Date();
  data.isActive = true;

  data.backgroundColor = backgroundColor;
  data.textColor = textColor;

  const allPosts = await db.collection("patient").insertOne(data);
  // const baseUrl = request ? `${request.protocol}://${request.get('Host')}` : '';

  const headersList = request.headers;
  const domain = headersList.get("host") || "";
  const proto = headersList.get("x-forwarded-proto");

  let k = await fetch(`${proto}://${domain}/api/ai_treatment_assistance`, {
    method: "post",
    body: JSON.stringify({ ...data, ...allPosts }),
  });
  // await axios.post("ai_treatment_assistance", {
  //   ...data,...allPosts
  // })
  return NextResponse.json({ status: 200 });
}
