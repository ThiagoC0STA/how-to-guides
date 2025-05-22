"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const AuthContext = createContext({ loading: true, session: null });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);

      // Protege todas as rotas /administrador/* exceto /administrador/login
      if (
        !session &&
        pathname.startsWith("/administrador") &&
        pathname !== "/administrador/login"
      ) {
        router.replace("/administrador/login");
      }
      // Se já está logado e está na página de login, redireciona para dashboard
      if (session && pathname === "/administrador/login") {
        router.replace("/administrador/dashboard");
      }
    });
  }, [router, pathname]);

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>Carregando...</div>
    );
  }

  return (
    <AuthContext.Provider value={{ loading, session }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
