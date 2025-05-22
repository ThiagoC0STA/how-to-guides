import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  console.log("🛡️ Middleware chamado para:", req.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ["/administrador/:path*"],
};
