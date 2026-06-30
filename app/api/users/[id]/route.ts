import clientPromise from "@/lib";
import { getTokenFromCookies, verifyToken } from "@/lib/auth";
import { hashPassword } from "@/lib/password";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

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

        if (id === payload.userId) {
            return NextResponse.json(
                { error: 'Cannot delete yourself' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("nexsol");
        const collection = db.collection("users");

        const user = await collection.findOne({ _id: new ObjectId(id) });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('DELETE error:', error);
        return NextResponse.json(
            { error: 'Failed to delete user' },
            { status: 500 }
        );
    }
}





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
        const { name, email, password, role, specialties, responsibilities } = body;

        const client = await clientPromise;
        const db = client.db("nexsol");
        const collection = db.collection("users");

        const existingUser = await collection.findOne({ _id: new ObjectId(id) });
        if (!existingUser) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        if (email && email !== existingUser.email) {
            const emailTaken = await collection.findOne({
                email,
                _id: { $ne: new ObjectId(id) }
            });
            if (emailTaken) {
                return NextResponse.json(
                    { error: 'Email already taken' },
                    { status: 400 }
                );
            }
        }

        const updateData: any = {
            updatedAt: new Date(),
        };

        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (role) updateData.role = role;
        if (specialties) updateData.specialties = specialties;
        if (responsibilities) updateData.responsibilities = responsibilities;
        if (password) updateData.password = await hashPassword(password);

        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }
        const updatedUser = await collection.findOne(
            { _id: new ObjectId(id) },
            { projection: { password: 0 } }
        );

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('PATCH error:', error);
        return NextResponse.json(
            { error: 'Failed to update user' },
            { status: 500 }
        );
    }
}