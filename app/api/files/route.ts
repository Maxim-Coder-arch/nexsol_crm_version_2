import { NextResponse } from 'next/server';
import clientPromise from '@/lib';
import { getTokenFromCookies, verifyToken } from '@/lib/auth';

export async function GET() {
    try {
        const token = await getTokenFromCookies();
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const payload = verifyToken(token);
        if (!payload) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const client = await clientPromise;
        const db = client.db('nexsol');
        
        const files = await db.collection('files.files')
            .find({ 'metadata.uploadedBy': payload.userId })
            .sort({ uploadDate: -1 })
            .toArray();
        const formattedFiles = files.map(file => ({
            _id: file._id.toString(),
            filename: file.filename,
            size: file.length,
            contentType: file.contentType || 'unknown',
            createdAt: file.uploadDate,
        }));

        return NextResponse.json(formattedFiles);
    } catch (error) {
        console.error('Files list error:', error);
        return NextResponse.json({
            error: 'Ошибка при получении списка файлов',
        }, { status: 500 });
    }
}