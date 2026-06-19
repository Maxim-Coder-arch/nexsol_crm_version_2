import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { status } = await request.json();
        const { id } = await params;

        console.log('PATCH id:', id);

        if (!status) {
            return NextResponse.json(
                { error: 'Status is required' },
                { status: 400 }
            );
        }

        if (!id || typeof id !== 'string') {
            return NextResponse.json(
                { error: 'Invalid ID' },
                { status: 400 }
            );
        }

        let objectId;
        try {
            objectId = new ObjectId(id);
        } catch {
            return NextResponse.json(
                { error: 'Invalid ID format' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("nexsol");
        const collection = db.collection("leads");

        const result = await collection.updateOne(
            { _id: objectId },
            {
                $set: {
                    status,
                    updatedAt: new Date()
                }
            }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { error: 'Lead not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('PATCH error:', error);
        return NextResponse.json(
            { error: 'Failed to update lead' },
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

        console.log('DELETE id:', id);

        if (!id || typeof id !== 'string') {
            return NextResponse.json(
                { error: 'Invalid ID' },
                { status: 400 }
            );
        }

        let objectId;
        try {
            objectId = new ObjectId(id);
        } catch {
            return NextResponse.json(
                { error: 'Invalid ID format' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("nexsol");
        const collection = db.collection("leads");

        const result = await collection.deleteOne({ _id: objectId });

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { error: 'Lead not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('DELETE error:', error);
        return NextResponse.json(
            { error: 'Failed to delete lead' },
            { status: 500 }
        );
    }
}