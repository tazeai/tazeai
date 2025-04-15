import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { checkSessionCookie } from '@tazeai/auth/middleware';

export const config = {
  matcher: ['/((?!_next/static|_next/image|images|locales|assets|favicon.ico|api/*).*)'],
};

const publicRoutes = ['/sign-in', '/sign-up', '/'];

function setRequestId(request: Request) {
  request.headers.set('x-correlation-id', crypto.randomUUID());
}

export default async function middleware(request: NextRequest) {
  setRequestId(request);
  const response = NextResponse.next();
  try {
    if (publicRoutes.includes(request.nextUrl.pathname)) {
      return response;
    }
    if (!checkSessionCookie(request)) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
  return response;
}
