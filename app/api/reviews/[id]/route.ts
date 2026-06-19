import clientPromise from "@/lib";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { status } = body;

        if (!status) {
            return NextResponse.json(
                { error: 'Status is required' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("nexsol");
        const collection = db.collection("reviews");

        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    status,
                    updatedAt: new Date()
                }
            }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { error: 'Review not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json(
            { error: 'Failed to update review' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const client = await clientPromise;
        const db = client.db("nexsol");
        const collection = db.collection("reviews");

        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { error: 'Review not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json(
            { error: 'Failed to delete review' },
            { status: 500 }
        );
    }
}