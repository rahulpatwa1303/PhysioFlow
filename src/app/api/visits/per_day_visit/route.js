import { MongoClient } from "mongodb";
import clientPromise from "@/utils/mongodb";
import { NextResponse } from "next/server";

const client = await clientPromise;
const db = client.db("visit_tasker");

export async function GET() {
  const allPosts = await db.collection("patient").find({}).toArray();
  return NextResponse.json({ status: 200, data: allPosts });
}


export async function POST(request) {
  const body = await request.json();
  const patients = await db.collection("patient").find({});
  patients.map((p) => console.log(p))
  return NextResponse.json({ status: 200 });
}
