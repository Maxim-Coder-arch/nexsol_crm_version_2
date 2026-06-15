import { NextResponse } from 'next/server';
import clientPromise from '@/lib';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('nexsol');
    const collection = db.collection('visitors');

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const uniqueToday = await collection.distinct('visitorId', {
      timestamp: { $gte: today }
    });

    const uniqueWeek = await collection.distinct('visitorId', {
      timestamp: { $gte: weekAgo }
    });

    const uniqueMonth = await collection.distinct('visitorId', {
      timestamp: { $gte: monthAgo }
    });

    const totalToday = await collection.countDocuments({
      timestamp: { $gte: today }
    });

    const totalWeek = await collection.countDocuments({
      timestamp: { $gte: weekAgo }
    });

    const totalMonth = await collection.countDocuments({
      timestamp: { $gte: monthAgo }
    });

    return NextResponse.json({
      uniqueToday: uniqueToday.length,
      uniqueWeek: uniqueWeek.length,
      uniqueMonth: uniqueMonth.length,
      totalToday,
      totalWeek,
      totalMonth
    });
  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}