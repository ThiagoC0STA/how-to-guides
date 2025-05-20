"use client";

import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import { FaRobot } from "react-icons/fa";

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 3,
        py: 8,
      }}
    >
      <Box
        sx={{
          width: 90,
          height: 90,
          borderRadius: "50%",
          bgcolor: "#f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 24px 0 #a5b4fc33",
          mb: 2,
        }}
      >
        <FaRobot size={48} color="#6366f1" />
      </Box>
      <Typography variant="h2" sx={{ fontWeight: 900, mb: 1, fontSize: { xs: 32, md: 48 }, letterSpacing: -1 }}>
        404: AI Lost in Cyberspace
      </Typography>
      <Typography sx={{ color: "text.secondary", mb: 3, fontSize: { xs: 18, md: 22 } }}>
        Oops! Our AI couldn&apos;t find this page.<br />
        Maybe the robots took a wrong turn in the algorithm...
      </Typography>
      <Link href="/" passHref>
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 700,
            px: 4,
            py: 1.5,
            fontSize: 18,
            boxShadow: "0 2px 8px #6366f122",
          }}
        >
          Go Home
        </Button>
      </Link>
    </Box>
  );
} 