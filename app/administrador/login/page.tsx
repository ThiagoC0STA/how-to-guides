"use client";

import { useState } from "react";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import { FaRobot } from "react-icons/fa";
import { useLoading } from "@/components/LoadingProvider";
import { supabase } from "@/lib/supabaseClient";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const loading = useLoading();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    loading.show();

    // Login 100% pelo Supabase Client
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      setError(error?.message || "Login failed");
      loading.hide();
      return;
    }

    router.push("/administrador/dashboard");
    loading.hide();
  }

  // async function handleCreateAdmin() {
  //   setError("");
  //   try {
  //     const res = await axios.post("/api/auth/create-admin", {
  //       email: "admin@howtoguides.com",
  //       password: "A1!gpt-HowTo2024#",
  //     });
  //     alert("Usuário admin criado com sucesso!");
  //   } catch (err: any) {
  //     setError(err.response?.data?.error || "Erro ao criar admin");
  //   }
  // }

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
              transition: "all 0.2s ease-in-out",
              background: "linear-gradient(90deg, #6366f1 60%, #134CCD 100%)",

              "&:hover": {
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
