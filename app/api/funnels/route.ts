import clientPromise from "@/lib";
import { getTokenFromCookies, verifyToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("nexsol");
        const collection = db.collection("funnels");
        const funnels = await collection.find({}).sort({ createdAt: -1 }).toArray();
        return NextResponse.json(funnels);
    } catch (e) {
        return NextResponse.json({ error: 'Failed to fetch funnels' }, { status: 500 });
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
        const { title, type, items } = body;

        if (!title || !type) {
            return NextResponse.json(
                { error: 'Title and type are required' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("nexsol");
        const collection = db.collection("funnels");

        const newFunnel = {
            title,
            type,
            items: items || [
                { id: '1', title: 'Шаг 1', type: 'TOFU' },
                { id: '2', title: 'Шаг 2', type: 'MOFU' },
                { id: '3', title: 'Шаг 3', type: 'BOFU' },
            ],
            createdBy: payload.userId,
            createdByName: payload.name,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await collection.insertOne(newFunnel);

        return NextResponse.json({
            ...newFunnel,
            _id: result.insertedId.toString(),
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create funnel' },
            { status: 500 }
        );
    }
}