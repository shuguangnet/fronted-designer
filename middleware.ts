import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Check if user has required role for builder
    if (path.startsWith("/builder") && token?.role !== "ADMIN" && token?.role !== "EDITOR") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/builder/:path*", "/api/pages/:path*", "/api/themes/:path*"],
};
