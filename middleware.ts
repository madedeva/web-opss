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

  // Membatasi akses berdasarkan roleId
  if (token) {
    const userRoleId = token.roleId;

    // Daftar route yang hanya dapat diakses oleh roleId 1
    const restrictedRoutesForRole1 = [
      "/dashboard/mypapers",
      "/dashboard/availableconference",
      "/dashboard/create-submission"
    ];

    // Jika userRoleId bukan 1 dan mencoba mengakses route di restrictedRoutesForRole1
    if (restrictedRoutesForRole1.some(route => pathname.startsWith(route)) && userRoleId !== 1) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    // Kamu bisa menambahkan pembatasan akses untuk roleId lain dengan cara yang serupa
    const restrictedRoutesForRole2 = [
      "/dashboard/conference",
      "/dashboard/papers"
    ];

    if (restrictedRoutesForRole2.some(route => pathname.startsWith(route)) && userRoleId !== 2) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }


    const restrictedRoutesForRole3 = [
      "/dashboard/myreviews",
    ];

    if (restrictedRoutesForRole3.some(route => pathname.startsWith(route)) && userRoleId !== 3) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    const restrictedRoutesForRole4 = [
      "/dashboard/admin/conferences",
      "/dashboard/admin/users"
    ];

    if (restrictedRoutesForRole4.some(route => pathname.startsWith(route)) && userRoleId !== 4) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/signin"],
};
