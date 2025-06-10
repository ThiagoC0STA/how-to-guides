import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ success: true });

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

  try {
    // Fazer logout no Supabase
    const { error } = await supabase.auth.signOut();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Limpar cookies de autenticação
    const cookieOptions = {
      path: "/",
      maxAge: 0,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
    };

    // Remover cookies do Supabase
    res.cookies.set({
      name: "sb-access-token",
      value: "",
      ...cookieOptions,
    });

    res.cookies.set({
      name: "sb-refresh-token",
      value: "",
      ...cookieOptions,
    });

    res.cookies.set({
      name: "sb-msdvigtxgacjqzgavlvv-auth-token",
      value: "",
      ...cookieOptions,
    });
    return res;
  } catch (error) {
    console.error("❌ Logout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
