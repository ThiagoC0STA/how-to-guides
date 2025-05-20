"use client";

import { useState } from "react";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import { FaRobot } from "react-icons/fa";
import { useLoading } from "@/components/LoadingProvider";
import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const loading = useLoading();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    console.log("🚀 Login attempt started");
    setError("");
    loading.show();

    console.log("📤 Sending login request");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    console.log("📥 Login response received:", res.status);
    loading.hide();

    if (res.ok) {
      console.log("✅ Login successful, refreshing router");
      await router.refresh();
      console.log("🔄 Router refreshed, redirecting to dashboard");
      router.push("/administrador/dashboard");
    } else {
      console.log("❌ Login failed");
      let data: any = {};
      try {
        data = await res.json();
      } catch (e) {
        data = { error: "Login failed" };
      }
      setError(data?.error || "Login failed");
    }
  }

  //   async function handleCreateAdmin() {
  //     setError("");
  //     try {
  //       const res = await axios.post("/api/auth/create-admin", {
  //         email: "admin@howtoguides.com",
  //         password: "A1!gpt-HowTo2024#",
  //       });
  //       alert("Usuário admin criado com sucesso!");
  //     } catch (err: any) {
  //       setError(err.response?.data?.error || "Erro ao criar admin");
  //     }
  //   }

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
          Admin Login
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 2, fontSize: 16 }}>
          Área restrita para administradores do How-To Guides
        </Typography>
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
            alignItems: "center",
          }}
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            size="small"
            sx={{ fontSize: 18, borderRadius: 2 }}
            InputProps={{ sx: { fontSize: 18, borderRadius: 2, py: 1.2 } }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            size="small"
            sx={{ fontSize: 18, borderRadius: 2 }}
            InputProps={{ sx: { fontSize: 18, borderRadius: 2, py: 1.2 } }}
          />
          {error && (
            <Alert severity="error" sx={{ width: "100%" }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              fontWeight: 800,
              width: "100%",
              py: 1.5,
              fontSize: 18,
              borderRadius: 2,
              boxShadow: "0 2px 8px #6366f122",
              mt: 1,
              letterSpacing: 0.5,
              transition: "all 0.2s cubic-bezier(.4,2,.3,1)",
              "&:hover": {
                background: "linear-gradient(90deg, #6366f1 60%, #2563eb 100%)",
                color: "white",
                boxShadow: "0 4px 16px #6366f144",
              },
            }}
          >
            Entrar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
