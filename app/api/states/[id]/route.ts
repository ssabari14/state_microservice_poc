import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { statesCollection } from "../../../lib/collections";

/* =========================
   UPDATE STATE (PUT)
   ========================= */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

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

/* =========================
   DELETE STATE (DELETE)
   ========================= */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const collection = await statesCollection();

  await collection.deleteOne({
    _id: new ObjectId(id),
  });

  return NextResponse.json({ success: true });
}
