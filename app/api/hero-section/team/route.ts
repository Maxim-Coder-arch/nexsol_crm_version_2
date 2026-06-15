import { NextResponse } from 'next/server';
import clientPromise from '@/lib';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('nexsol');
    const collection = db.collection('users');

    const users = await collection
      .find({})
      .project({ name: 1, specialties: 1 })
      .limit(6)
      .toArray();

    const formattedTeam = users.map((user) => ({
      _id: user._id.toString(),
      name: user.name,
      specialties: user.specialties || [],
    }));

    return NextResponse.json(formattedTeam);
  } catch (error) {
    console.error('Team API error:', error);
    return NextResponse.json({ error: 'Failed to fetch team' }, { status: 500 });
  }
}