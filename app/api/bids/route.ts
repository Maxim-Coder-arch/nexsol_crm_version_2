import clientPromise from "@/lib";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("nexsol");
        const collection = db.collection("leads");
        const leads = await collection.find({}).sort({ createdAt: -1 }).toArray();
        return NextResponse.json(leads);
    } catch (e) {
        return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, contact, message } = body;
        
        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and email are required' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("nexsol");
        const collection = db.collection("leads");
        
        const now = new Date();
        const newLead = {
            name,
            email,
            contact: contact || '',
            message: message || '',
            source: 'manual',
            status: 'new',
            createdAt: now,
            updatedAt: now,
        };
        
        const result = await collection.insertOne(newLead);
        
        return NextResponse.json({
            ...newLead,
            _id: result.insertedId,
        }, { status: 201 });
    } catch (e) {
        return NextResponse.json({ status: 500 });
    }
}