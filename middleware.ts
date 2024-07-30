// middleware.ts

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.JWT_SECRET });

  const { pathname } = request.nextUrl;

  // Jika pengguna tidak login dan mencoba mengakses halaman yang dilindungi
  if (!token && pathname !== "/signin") {
    return NextResponse.redirect(new URL("/signin", request.url));
  } 
  if (token && pathname === "/signin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/signin"],
};
