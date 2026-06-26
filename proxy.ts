// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken, getTokenFromCookies } from './lib/auth';

const publicRoutes = ['/login', '/register'];

export async function proxy(request: NextRequest) {
    const token = await getTokenFromCookies();
    const { pathname } = request.nextUrl;

    console.log('Middleware path:', pathname);
    console.log('Token exists:', !!token);

    // Если пользователь на странице логина и уже авторизован — редирект на главную
    if (pathname === '/login' || pathname === '/register') {
        if (token) {
            console.log('User already logged in, redirecting to /');
            return NextResponse.redirect(new URL('/', request.url));
        }
        return NextResponse.next();
    }

    // Если нет токена и не публичный маршрут — редирект на логин
    if (!token) {
        console.log('No token, redirecting to login');
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('from', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Проверяем валидность токена
    const payload = verifyToken(token);
    console.log('Token payload:', payload);

    if (!payload) {
        console.log('Invalid token, redirecting to login');
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('from', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Проверка ролей
    if (pathname.startsWith('/admin') || pathname.startsWith('/settings') || pathname.startsWith('/users')) {
        if (!['admin', 'director'].includes(payload.role)) {
            console.log('Access denied for role:', payload.role);
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    if (pathname.startsWith('/applications') || pathname.startsWith('/reviews')) {
        if (!['admin', 'director', 'moderator'].includes(payload.role)) {
            console.log('Access denied for role:', payload.role);
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|api/auth).*)'],
};