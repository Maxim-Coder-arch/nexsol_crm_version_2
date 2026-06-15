import { NextResponse } from 'next/server';
import clientPromise from '@/lib';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('nexsol');
    const collection = db.collection('leads');

    const leads = await collection
      .find({ status: 'new' })
      .sort({ createdAt: -1 })
      .limit(3)
      .toArray();

    const formattedLeads = leads.map((lead) => {
      const date = new Date(lead.createdAt);
      const createdAtStr = date.toLocaleDateString('ru-RU');
      const timeStr = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

      return {
        _id: lead._id.toString(),
        name: lead.name,
        email: lead.email,
        contact: lead.contact,
        message: lead.message || 'Нет сообщения',
        status: lead.status,
        createdAt: createdAtStr,
        time: timeStr,
      };
    });

    return NextResponse.json(formattedLeads);
  } catch (error) {
    console.error('Leads API error:', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}