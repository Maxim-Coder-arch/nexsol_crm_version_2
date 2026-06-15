import { NextResponse } from 'next/server';
import clientPromise from '@/lib';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('nexsol');
    const collection = db.collection('visitors');

    const visitors = await collection
      .find({})
      .sort({ timestamp: -1 })
      .limit(10)
      .toArray();

    const formattedVisitors = visitors.map((visitor) => {
      const date = new Date(visitor.timestamp);
      const timeStr = date.toLocaleDateString('ru-RU') + ' ' + date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

      let device = 'Desktop';
      const ua = visitor.userAgent?.toLowerCase() || '';
      if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
        device = 'Mobile';
      } else if (ua.includes('tablet') || ua.includes('ipad')) {
        device = 'Tablet';
      }

      let source = visitor.referrer || 'direct';
      if (source.includes('google')) source = 'Google';
      else if (source.includes('yandex')) source = 'Yandex';
      else if (source.includes('facebook') || source.includes('fb')) source = 'Facebook';
      else if (source.includes('vk') || source.includes('vkontakte')) source = 'VK';
      else if (source === 'direct') source = 'Прямой переход';

      return {
        _id: visitor.visitorId?.slice(-8) || visitor._id.toString().slice(-8),
        page: visitor.page,
        source,
        device,
        time: timeStr,
      };
    });

    return NextResponse.json(formattedVisitors);
  } catch (error) {
    console.error('Visitors API error:', error);
    return NextResponse.json({ error: 'Failed to fetch visitors' }, { status: 500 });
  }
}