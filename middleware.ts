import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  console.log("🛡️ Middleware called for path:", req.nextUrl.pathname);
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          res.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: any) {
          res.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("🔑 Session status:", session ? "Logged in" : "Not logged in");

  // Se não estiver logado e tentar acessar o dashboard
  if (!session && req.nextUrl.pathname.startsWith("/administrador/dashboard")) {
    console.log("⚠️ Redirecting to login page");
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/administrador/site";
    return NextResponse.redirect(redirectUrl);
  }

  // Se estiver logado e tentar acessar a página de login
  if (session && req.nextUrl.pathname === "/administrador/site") {
    console.log("⚠️ Redirecting to dashboard");
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/administrador/dashboard";
    return NextResponse.redirect(redirectUrl);
  }

  console.log("✅ Middleware passed");
  return res;
}

export const config = {
  matcher: ["/administrador/:path*"],
};
