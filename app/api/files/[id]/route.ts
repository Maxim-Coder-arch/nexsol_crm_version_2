import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getTokenFromCookies, verifyToken } from '@/lib/auth';
import clientPromise from '@/lib';
import { getGridFSBucket } from '@/lib/gridFs';

function getMimeType(filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    
    const mimeTypes: Record<string, string> = {
        'txt': 'text/plain',
        'csv': 'text/csv',
        'md': 'text/markdown',
        'json': 'application/json',
        'xml': 'application/xml',
        'html': 'text/html',
        'css': 'text/css',
        'js': 'application/javascript',
        'ts': 'application/typescript',
        'pdf': 'application/pdf',
        'doc': 'application/msword',
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'odt': 'application/vnd.oasis.opendocument.text',
        'rtf': 'application/rtf',
        'xls': 'application/vnd.ms-excel',
        'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'ods': 'application/vnd.oasis.opendocument.spreadsheet',
        'ppt': 'application/vnd.ms-powerpoint',
        'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'odp': 'application/vnd.oasis.opendocument.presentation',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'svg': 'image/svg+xml',
        'webp': 'image/webp',
        'bmp': 'image/bmp',
        'ico': 'image/x-icon',
        'mp4': 'video/mp4',
        'avi': 'video/x-msvideo',
        'mov': 'video/quicktime',
        'mkv': 'video/x-matroska',
        'webm': 'video/webm',
        'mp3': 'audio/mpeg',
        'wav': 'audio/wav',
        'flac': 'audio/flac',
        'ogg': 'audio/ogg',
        'm4a': 'audio/mp4',
        'zip': 'application/zip',
        'rar': 'application/vnd.rar',
        '7z': 'application/x-7z-compressed',
        'tar': 'application/x-tar',
        'gz': 'application/gzip',
        'py': 'text/x-python',
        'java': 'text/x-java',
        'cpp': 'text/x-c++src',
        'c': 'text/x-csrc',
        'go': 'text/x-go',
        'rs': 'text/x-rust',
    };
    
    return mimeTypes[extension] || 'application/octet-stream';
}

function encodeFilename(filename: string): string {
    const hasNonAscii = /[^\x20-\x7E]/.test(filename);
    
    if (!hasNonAscii) {
        return `filename="${filename}"`;
    }
    
    const encoded = encodeURIComponent(filename)
        .replace(/['()]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`)
        .replace(/\*/g, '%2A');
    
    return `filename*=UTF-8''${encoded}`;
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse | Response> {
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

        const client = await clientPromise;
        const db = client.db('nexsol');

        const file = await db.collection('files.files').findOne({
            _id: new ObjectId(id),
        });

        if (!file) {
            return NextResponse.json({ error: 'Файл не найден' }, { status: 404 });
        }

        if (file.metadata.uploadedBy !== payload.userId) {
            return NextResponse.json({ error: 'Доступ запрещён' }, { status: 403 });
        }

        const bucket = await getGridFSBucket();
        const downloadStream = bucket.openDownloadStream(new ObjectId(id));

        const chunks: Buffer[] = [];

        return new Promise<NextResponse | Response>((resolve) => {
            downloadStream.on('data', (chunk) => chunks.push(chunk));
            
            downloadStream.on('error', (error) => {
                console.error('Download error:', error);
                resolve(NextResponse.json({
                    error: 'Ошибка при скачивании файла',
                }, { status: 500 }));
            });
            
            downloadStream.on('end', () => {
                const buffer = Buffer.concat(chunks);
                const mimeType = getMimeType(file.filename);
                
                resolve(new Response(buffer, {
                    headers: {
                        'Content-Type': mimeType,
                        'Content-Disposition': `attachment; ${encodeFilename(file.filename)}`,
                        'Content-Length': file.length.toString(),
                    },
                }));
            });
        });
    } catch (error) {
        console.error('Download error:', error);
        return NextResponse.json({
            error: 'Ошибка при скачивании файла',
        }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
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

        const client = await clientPromise;
        const db = client.db('nexsol');

        const file = await db.collection('files.files').findOne({
            _id: new ObjectId(id),
        });

        if (!file) {
            return NextResponse.json({ error: 'Файл не найден' }, { status: 404 });
        }
        if (file.metadata.uploadedBy !== payload.userId) {
            return NextResponse.json({ error: 'Доступ запрещён' }, { status: 403 });
        }

        const bucket = await getGridFSBucket();
        await bucket.delete(new ObjectId(id));

        return NextResponse.json({ 
            success: true, 
            message: 'Файл успешно удалён' 
        });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({
            error: 'Ошибка при удалении файла',
        }, { status: 500 });
    }
}