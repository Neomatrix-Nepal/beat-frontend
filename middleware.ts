import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const { pathname } = request.nextUrl;

  const isProtectedPath = pathname.startsWith('/') && !pathname.startsWith('/login') && !pathname.startsWith('/public');

  if (isProtectedPath && !refreshToken) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.search = `?redirect=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Only match protected routes — exclude login explicitly
export const config = {
  matcher: ['/', '/dashboard/:path*'], // Add protected routes only
};
