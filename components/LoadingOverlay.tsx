import { Box, CircularProgress } from "@mui/material";

export default function LoadingOverlay() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "rgba(245,247,250,0.7)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={64} color="primary" thickness={4} />
    </Box>
  );
} 