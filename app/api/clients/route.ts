import clientPromise from "@/lib";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("nexsol");
        const collection = db.collection("clients");
        const clients = await collection.find({}).sort({ createdAt: -1 }).toArray();
        return NextResponse.json(clients);
    } catch (e) {
        return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, workStatus, physicalStatus, comment, additionalData } = body;

        if (!name) {
            return NextResponse.json(
                { error: 'Name is required' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("nexsol");
        const collection = db.collection("clients");
        
        const now = new Date();
        const newClient = {
            name,
            workStatus: workStatus || "new",
            physicalStatus: physicalStatus || "successful",
            comment: comment || '',
            additionalData: additionalData || [],
            createdAt: now,
            updatedAt: now,
        };
        
        const result = await collection.insertOne(newClient);
        
        return NextResponse.json({
            ...newClient,
            _id: result.insertedId,
        }, { status: 201 });
    } catch (e) {
        console.error('POST error:', e);
        return NextResponse.json(
            { error: 'Failed to create client' },
            { status: 500 }
        );
    }
}