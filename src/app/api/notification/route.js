import { MongoClient, ObjectId } from "mongodb";
import clientPromise from "@/utils/mongodb";
import { NextResponse } from "next/server";

const client = await clientPromise;
const db = client.db("visit_tasker");

export async function GET(req) {
    const patients = await db.collection("notification").find({viewed:false}).toArray();
    return NextResponse.json(patients)
}

