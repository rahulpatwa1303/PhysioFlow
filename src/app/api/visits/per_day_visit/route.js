import { MongoClient, ObjectId } from "mongodb";
import clientPromise from "@/utils/mongodb";
import { NextResponse } from "next/server";

const client = await clientPromise;
const db = client.db("visit_tasker");

export async function GET(req) {
  const requestedDate = new Date(req.nextUrl.searchParams.get("date"));

  if (isNaN(requestedDate.getTime())) {
    return NextResponse.json({ status: 400, error: "Invalid date format" });
  }
  requestedDate.setHours(0, 0, 0, 0);
  const unixTimestamp = (requestedDate.getTime() / 1000) * 1000;
  try {
    const visitsForTheDate = await db
      .collection("visits_for_the_day")
      .aggregate([
        {
          $match: {
            date: unixTimestamp,
          },
        },
        {
          $lookup: {
            from: "patient",
            localField: "patient",
            foreignField: "_id",
            as: "patient",
          },
        },
        { $unwind: "$patient" },
        {
          $project: {
            _id: 1,
            date: 1,
            isComplete: 1,
            completedDate: 1,
            completedTime: 1,
            patient: { name: 1, address: 1, fee_per_visit: 1 },
          },
        },
      ])
      .toArray();
    return NextResponse.json({ visitsForTheDate });
  } catch {
    return NextResponse.json(
      { error: "some error has occured" },
      { status: 500 }
    );
  }
}

export async function POST() {
  const patients = await db.collection("patient").find({}).toArray();
  const date = new Date().setHours(0, 0, 0, 0);
  patients.map(async (patient) => {
    if (patient.isActive) {
      await db.collection("visits_for_the_day").insertOne({
        date,
        patient: patient._id,
        isComplete: false,
      });
    }
  });

  return NextResponse.json({ status: 200 });
}

export async function PUT(request) {
  const data = await request.json();
  const date = new Date();
  await db.collection("visits_for_the_day").updateOne(
    { _id: new ObjectId(data._id) },
    {
      $set: {
        isComplete: data.markAs,
        markedOn: date,
      },
    }
  );

  return NextResponse.json({ status: 200 });
}
