import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const { pathname } = request.nextUrl;

  const isProtectedPath = pathname.startsWith('/') && !pathname.startsWith('/login') && !pathname.startsWith('/public');
const role = request.cookies.get('userRole')?.value; 
 
 if (
  isProtectedPath && 
  (
    !refreshToken ||    // no refresh token
    !role ||            // no role cookie
    role !== 'admin'    // role is not admin
  )
)  {
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
