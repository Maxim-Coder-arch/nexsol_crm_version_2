import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '7d';

export interface TokenPayload {
    userId: string;
    email: string;
    role: string;
    name: string;
}

export function generateToken(payload: TokenPayload): string {
    try {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    } catch (error) {
        console.error('generateToken error:', error);
        throw error;
    }
}

export function verifyToken(token: string): TokenPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch (error) {
        console.error('verifyToken error:', error);
        return null;
    }
}

export async function setTokenCookie(token: string): Promise<void> {
    try {
        console.log('Setting cookie...');
        const cookieStore = await cookies();
        cookieStore.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });
        console.log('Cookie set successfully');
    } catch (error) {
        console.error('setTokenCookie error:', error);
        throw error;
    }
}

export async function removeTokenCookie(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete('token');
}

export async function getTokenFromCookies(): Promise<string | null> {
    try {
        const cookieStore = await cookies();
        return cookieStore.get('token')?.value || null;
    } catch {
        return null;
    }
}