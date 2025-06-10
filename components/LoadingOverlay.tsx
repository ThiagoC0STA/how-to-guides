"use client";

import { Box } from "@mui/material";
import { RiseLoader } from "react-spinners";

export default function LoadingOverlay() {
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
      }}
    >
      <RiseLoader color="#134CCD" size={15} />
    </Box>
  );
}
