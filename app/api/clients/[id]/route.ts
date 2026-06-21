import clientPromise from "@/lib";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name, workStatus, physicalStatus, comment, additionalData } = body;

        const client = await clientPromise;
        const db = client.db("nexsol");
        const collection = db.collection("clients");

        const updateData: any = {
            updatedAt: new Date()
        };

        if (name !== undefined) updateData.name = name;
        if (workStatus !== undefined) updateData.workStatus = workStatus;
        if (physicalStatus !== undefined) updateData.physicalStatus = physicalStatus;
        if (comment !== undefined) updateData.comment = comment;
        if (additionalData !== undefined) updateData.additionalData = additionalData;

        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { error: 'Client not found' },
                { status: 404 }
            );
        }

        const updatedClient = await collection.findOne({ _id: new ObjectId(id) });

        return NextResponse.json(updatedClient);
    } catch (error) {
        console.error('PATCH error:', error);
        return NextResponse.json(
            { error: 'Failed to update client' },
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
        const collection = db.collection("clients");

        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { error: 'Client not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('DELETE error:', error);
        return NextResponse.json(
            { error: 'Failed to delete client' },
            { status: 500 }
        );
    }
}