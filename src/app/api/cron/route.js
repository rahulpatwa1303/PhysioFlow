import { MongoClient, ObjectId } from "mongodb";
import clientPromise from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generateRandomColor } from "@/utils/utils";

const client = await clientPromise;
const db = client.db("visit_tasker");

export async function GET(request) {
console.log('====================================');
console.log('you are doing it');
console.log('====================================');
  }