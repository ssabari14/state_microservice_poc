import { NextResponse } from "next/server";
import { statesCollection } from "../../lib/collections";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q") || "";
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);

  const filter = q
    ? { name: { $regex: q, $options: "i" } }
    : {};

  const collection = await statesCollection();

  const data = await collection
    .find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();

  const total = await collection.countDocuments(filter);

  return NextResponse.json({
    success: true,
    data,
    meta: { page, limit, total },
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const collection = await statesCollection();

  const result = await collection.insertOne({
    name: body.name,
    code: body.code,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return NextResponse.json({
    success: true,
    data: { _id: result.insertedId, ...body },
  });
}
