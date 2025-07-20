import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const role = request.cookies.get("userRole")?.value;
  const { pathname } = request.nextUrl;

  const isProtectedPath =
    pathname.startsWith("/") &&
    !pathname.startsWith("/login") &&
    !pathname.startsWith("/public");

  // if (isProtectedPath && (!refreshToken || !role || role !== "customer")) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = "/login";
  //   url.search = `?redirect=${encodeURIComponent(pathname)}`;
  //   return NextResponse.redirect(url);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
