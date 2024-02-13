import { NextResponse } from "next/server";

export async function GET(request) {
  console.log("====================================");
  console.log("you are doing it");
  console.log("====================================");
  return NextResponse.json({'message':'we doing good'})
}
