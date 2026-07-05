import { NextRequest, NextResponse } from 'next/server';
import { getGridFSBucket } from '@/lib/gridFs';
import { getTokenFromCookies, verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const token = await getTokenFromCookies();
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const payload = verifyToken(token);
        if (!payload) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const bucket = await getGridFSBucket();

        const buffer = Buffer.from(await file.arrayBuffer());

        const uploadStream = bucket.openUploadStream(file.name, {
            contentType: file.type || 'application/octet-stream',
            metadata: {
                uploadedBy: payload.userId,
                uploadedByName: payload.name,
                originalName: file.name,
                size: file.size,
                mimeType: file.type || 'application/octet-stream',
            },
        });

        return new Promise((resolve) => {
            uploadStream.write(buffer);
            uploadStream.end();

            uploadStream.on('finish', () => {
                resolve(NextResponse.json({
                    success: true,
                    fileId: uploadStream.id.toString(),
                    filename: file.name,
                    size: file.size,
                    message: 'Файл успешно загружен',
                }, { status: 201 }));
            });

            uploadStream.on('error', (error) => {
                console.error('Upload error:', error);
                resolve(NextResponse.json({
                    error: 'Ошибка при загрузке файла',
                    details: error.message,
                }, { status: 500 }));
            });
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({
            error: 'Ошибка при загрузке файла',
        }, { status: 500 });
    }
}