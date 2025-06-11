// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const protectedPaths = ['/dashboard'];

  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath && !refreshToken) {
    // No refresh token, redirect to login
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.search = `?redirect=${encodeURIComponent(request.nextUrl.pathname)}`;
    return NextResponse.redirect(url);
  }

  // If refresh token exists, let the client handle access token validation
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};