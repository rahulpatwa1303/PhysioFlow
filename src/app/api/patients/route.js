import { MongoClient } from "mongodb";
import clientPromise from "@/utils/mongodb";
import { NextResponse } from "next/server";

const client = await clientPromise;
const db = client.db("visit_tasker");

export async function GET() {
  const allPosts = await db.collection("patient").find({}).toArray();
  return NextResponse.json({ status: 200, data: allPosts });
}

const formInitalValue = {
  name: "",
  height: "",
  weight: "",
  age: "",
  phone_number: "",
  address: "",

  reason_for_visit: "",
  past_medical_condition: "",
  surgeries: "",

  fee_per_visit: "",
  payment_frequency: "",
};

export async function POST(request) {
  const body = await request.json();

  // Validate incoming fields against expected fields
  const expectedFields = Object.keys(formInitalValue); // Get expected fields from formInitalValue
  const validFields = Object.keys(body).filter((field) =>
    expectedFields.includes(field)
  );
  const extraFields = Object.keys(body).filter(
    (field) => !expectedFields.includes(field)
  );

  if (extraFields.length > 0) {
    return NextResponse.json(
      { error: "Invalid fields: " + extraFields.join(", ") },
      { status: 400 }
    );
  }

  // Add createdAt and updatedAt fields with current timestamp
  body.createdAt = new Date();
  body.updatedAt = new Date();

  const allPosts = await db.collection("patient").insertOne(body);
  return NextResponse.json({ status: 200 });
}
