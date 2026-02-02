import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET!;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });

  console.log(token)
  const pathname = req.nextUrl.pathname;

  // 1️⃣ If not logged in, redirect to /login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role = token.role as "student" | "counselor";

  console.log(role)

  const isStudentRoute = pathname.startsWith("/student");
  const isCounselorRoute = pathname.startsWith("/counselor");

  // 2️⃣ Prevent redirect loop:
  // If student is already on /student → allow
  if (role === "student" && isStudentRoute) return NextResponse.next();

  // If counselor is already on /counselor → allow
  if (role === "counselor" && isCounselorRoute) return NextResponse.next();

  // 3️⃣ Redirect users to their correct dashboard
  if (role === "student" && isCounselorRoute) {
    return NextResponse.redirect(new URL("/student", req.url));
  }

  if (role === "counselor" && isStudentRoute) {
    return NextResponse.redirect(new URL("/counselor", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/student/:path*", "/counselor/:path*"],
};