import clientPromise from "@/lib";
import { getTokenFromCookies, verifyToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("nexsol");
        const collection = db.collection("services");
        const services = await collection.find({}).sort({ createdAt: -1 }).toArray();
        return NextResponse.json(services);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const token = await getTokenFromCookies();
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const payload = verifyToken(token);
        if (!payload) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { title, description, url } = body;
        if (!title || !url) {
            return NextResponse.json(
                { error: 'Title and URL are required' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("nexsol");
        const collection = db.collection("services");

        const newService = {
            title,
            description: description || '',
            url,
            createdAt: Date.now(),
        };

        const result = await collection.insertOne(newService);

        return NextResponse.json({
            ...newService,
            _id: result.insertedId,
        }, { status: 201 });
    } catch (error) {
        console.error('POST error:', error);
        return NextResponse.json(
            { error: 'Failed to create service' },
            { status: 500 }
        );
    }
}