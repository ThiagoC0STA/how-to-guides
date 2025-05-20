import { AppBar, Toolbar, Button, Box, Typography, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { FaRobot, FaSignOutAlt, FaHome, FaBook, FaCog } from "react-icons/fa";
import { useLoading } from "@/components/LoadingProvider";

export default function AdminHeader() {
  const router = useRouter();
  const loading = useLoading();

  const handleLogout = async () => {
    loading.show();
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (res.ok) {
        router.push("/administrador/site");
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
    loading.hide();
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        bgcolor: "white",
        boxShadow: "0 2px 12px 0 #6366f122",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 4 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton 
            onClick={() => router.push("/administrador/dashboard")}
            sx={{ 
              color: "#6366f1",
              "&:hover": { bgcolor: "#f3f4f6" }
            }}
          >
            <FaRobot size={24} />
          </IconButton>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              color: "#1f2937",
              display: { xs: "none", sm: "block" }
            }}
          >
            Admin Dashboard
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            startIcon={<FaHome />}
            onClick={() => router.push("/")}
            sx={{
              color: "#4b5563",
              "&:hover": { bgcolor: "#f3f4f6" },
              display: { xs: "none", sm: "flex" }
            }}
          >
            Site
          </Button>
          <Button
            startIcon={<FaBook />}
            onClick={() => router.push("/administrador/guides")}
            sx={{
              color: "#4b5563",
              "&:hover": { bgcolor: "#f3f4f6" },
              display: { xs: "none", sm: "flex" }
            }}
          >
            Guias
          </Button>
          <Button
            startIcon={<FaCog />}
            onClick={() => router.push("/administrador/settings")}
            sx={{
              color: "#4b5563",
              "&:hover": { bgcolor: "#f3f4f6" },
              display: { xs: "none", sm: "flex" }
            }}
          >
            Configurações
          </Button>
          <Button
            startIcon={<FaSignOutAlt />}
            onClick={handleLogout}
            sx={{
              color: "#ef4444",
              "&:hover": { bgcolor: "#fee2e2" }
            }}
          >
            Sair
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 