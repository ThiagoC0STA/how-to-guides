"use client";

import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingOverlayProps {
  text?: string;
}

export default function LoadingOverlay({ text = "Carregando..." }: LoadingOverlayProps) {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(4px)",
        zIndex: 2000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        animation: "fadeIn 0.2s ease-in-out",
        "@keyframes fadeIn": {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
      }}
    >
      <CircularProgress 
        size={48} 
        thickness={4}
        sx={{
          color: "var(--primary-blue)",
        }}
      />
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          fontWeight: 500,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
} 