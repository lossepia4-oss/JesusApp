import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  if (!q) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL(`/ask/${encodeURIComponent(q)}`, request.url));
}

export const config = {
  matcher: "/",
};
