"use client";

import { Box, Typography, Button } from "@mui/material";
import { FaRobot } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Primeiro, chamar nossa API de logout
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Falha ao fazer logout");
      }

      // Depois, fazer logout no Supabase
      await supabase.auth.signOut();
      
      // Limpar cookies manualmente
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      // Redirecionar para a página de login
      router.push("/administrador/login");
      router.refresh();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(120deg, #f8fafc 60%, #e0e7ff 100%)",
      }}
    >
      <Box
        sx={{
          width: { xs: "98vw", sm: 440, md: 480 },
          maxWidth: "98vw",
          bgcolor: "white",
          borderRadius: 4,
          boxShadow: "0 8px 32px 0 #6366f122",
          p: { xs: 2, sm: 4, md: 5 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2.5,
        }}
      >
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            bgcolor: "#f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 24px 0 #a5b4fc33",
            mb: 1,
          }}
        >
          <FaRobot size={36} color="#6366f1" />
        </Box>
        <Typography
          variant="h4"
          sx={{ fontWeight: 900, mb: 0.5, letterSpacing: -1 }}
        >
          Painel do Administrador
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 2, fontSize: 16 }}>
          Bem-vindo ao painel! Aqui você poderá gerenciar os conteúdos do site.
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          sx={{ mt: 2, fontWeight: 700 }}
          onClick={handleLogout}
        >
          Sair
        </Button>
      </Box>
    </Box>
  );
}
