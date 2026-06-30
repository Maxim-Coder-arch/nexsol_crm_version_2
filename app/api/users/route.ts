import clientPromise from "@/lib";
import { NextResponse } from "next/server";
import { getTokenFromCookies, verifyToken } from "@/lib/auth";
import { hashPassword } from "@/lib/password";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("nexsol");
        const collection = db.collection("users");
        const users = await collection.find({}).sort({ createdAt: -1 }).toArray();
        const usersWithoutPassword = users.map(({ password, ...rest }) => rest);
        return NextResponse.json(usersWithoutPassword);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
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
        const { name, email, password, role, specialties, responsibilities } = body;
        
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Name, email and password are required' },
                { status: 400 }
            );
        }
        
        const client = await clientPromise;
        const db = client.db("nexsol");
        const collection = db.collection("users");
        
        const existingUser = await collection.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 400 }
            );
        }

        const hashedPassword = await hashPassword(password);

        const newUser = {
            name,
            email,
            password: hashedPassword,
            role: role || 'viewer',
            specialties: specialties || [],
            responsibilities: responsibilities || [],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await collection.insertOne(newUser);

        const { password: _, ...userWithoutPassword } = newUser;

        return NextResponse.json({
            ...userWithoutPassword,
            _id: result.insertedId,
        }, { status: 201 });
    } catch (error) {
        console.error('POST user error:', error);
        return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 500 }
        );
    }
}