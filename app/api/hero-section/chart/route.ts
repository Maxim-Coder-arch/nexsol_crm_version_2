import { NextResponse } from 'next/server';
import clientPromise from '@/lib';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'week';

    const client = await clientPromise;
    const db = client.db('nexsol');
    const collection = db.collection('visitors');

    const now = new Date();
    let startDate: Date;
    let groupFormat: any;

    switch (period) {
      case 'week':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        groupFormat = { $dayOfMonth: '$timestamp' };
        break;
      case 'month':
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
        groupFormat = { $week: '$timestamp' };
        break;
      case 'year':
        startDate = new Date(now);
        startDate.setFullYear(now.getFullYear() - 1);
        groupFormat = { $month: '$timestamp' };
        break;
      default:
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        groupFormat = { $dayOfMonth: '$timestamp' };
    }

    const pipeline = [
      {
        $match: {
          timestamp: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: groupFormat,
          visitors: { $sum: 1 },
          uniqueVisitors: { $addToSet: '$visitorId' }
        }
      },
      {
        $project: {
          date: '$_id',
          visitors: 1,
          unique: { $size: '$uniqueVisitors' }
        }
      },
      {
        $sort: { date: 1 }
      }
    ];

    const results = await collection.aggregate(pipeline).toArray();

    let formattedData: { date: string; visitors: number; unique: number }[] = [];

    if (period === 'week') {
      const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
      formattedData = results.map((item, index) => ({
        date: days[index] || String(item.date),
        visitors: item.visitors,
        unique: item.unique
      }));
    } else if (period === 'month') {
      formattedData = results.map((item) => ({
        date: `${item.date} нед`,
        visitors: item.visitors,
        unique: item.unique
      }));
    } else {
      const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
      formattedData = results.map((item) => ({
        date: months[(item.date as number) - 1] || String(item.date),
        visitors: item.visitors,
        unique: item.unique
      }));
    }

    return NextResponse.json({ data: formattedData });
  } catch (error) {
    console.error('Chart API error:', error);
    return NextResponse.json({ error: 'Failed to fetch chart data' }, { status: 500 });
  }
}