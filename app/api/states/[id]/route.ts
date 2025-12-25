import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { statesCollection } from "../../../lib/collections";

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const body = await request.json();
  const { id } = context.params;

  const collection = await statesCollection();

  await collection.updateOne(
    { _id: new ObjectId(id) },
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
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const collection = await statesCollection();

  await collection.deleteOne({
    _id: new ObjectId(id),
  });

  return NextResponse.json({ success: true });
}
