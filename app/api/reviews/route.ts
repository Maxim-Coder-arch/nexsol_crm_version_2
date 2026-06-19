import clientPromise from "@/lib";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("nexsol");
        const collection = db.collection("reviews");
        const reviews = await collection.find({}).sort({createdAt: -1}).toArray();
        return NextResponse.json(reviews);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }
}