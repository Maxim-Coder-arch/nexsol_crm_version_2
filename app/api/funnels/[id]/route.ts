import clientPromise from "@/lib";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getTokenFromCookies, verifyToken } from "@/lib/auth";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const token = await getTokenFromCookies();
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const payload = verifyToken(token);
        if (!payload) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const { title, type, items } = body;

        const client = await clientPromise;
        const db = client.db("nexsol");
        const collection = db.collection("funnels");

        const existingFunnel = await collection.findOne({ _id: new ObjectId(id) });
        if (!existingFunnel) {
            return NextResponse.json(
                { error: 'Funnel not found' },
                { status: 404 }
            );
        }

        if (existingFunnel.createdBy !== payload.userId) {
            return NextResponse.json(
                { error: 'Access denied' },
                { status: 403 }
            );
        }

        const updateData: any = {
            updatedAt: new Date(),
        };

        if (title !== undefined) updateData.title = title;
        if (type !== undefined) updateData.type = type;
        if (items !== undefined) updateData.items = items;

        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { error: 'Funnel not found' },
                { status: 404 }
            );
        }

        const updatedFunnel = await collection.findOne({ _id: new ObjectId(id) });

        return NextResponse.json({
            ...updatedFunnel,
            _id: updatedFunnel?._id.toString(),
        });
    } catch (error) {
        console.error('PATCH funnel error:', error);
        return NextResponse.json(
            { error: 'Failed to update funnel' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const token = await getTokenFromCookies();
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const payload = verifyToken(token);
        if (!payload) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        const client = await clientPromise;
        const db = client.db("nexsol");
        const collection = db.collection("funnels");

        const existingFunnel = await collection.findOne({ _id: new ObjectId(id) });
        if (!existingFunnel) {
            return NextResponse.json(
                { error: 'Funnel not found' },
                { status: 404 }
            );
        }

        if (existingFunnel.createdBy !== payload.userId) {
            return NextResponse.json(
                { error: 'Access denied' },
                { status: 403 }
            );
        }

        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { error: 'Funnel not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('DELETE funnel error:', error);
        return NextResponse.json(
            { error: 'Failed to delete funnel' },
            { status: 500 }
        );
    }
}