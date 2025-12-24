import { NextResponse } from "next/server";
import { statesCollection } from "../../../lib/collections";
import { ObjectId } from "mongodb";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const collection = await statesCollection();

  await collection.updateOne(
    { _id: new ObjectId(params.id) },
    {
      $set: {
        name: body.name,
        code: body.code,
        updatedAt: new Date(),
      },
    }
  );

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const collection = await statesCollection();

  await collection.deleteOne({
    _id: new ObjectId(params.id),
  });

  return NextResponse.json({ success: true });
}
