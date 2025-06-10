"use client";

import React from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import UpdateIcon from "@mui/icons-material/Update";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CodeIcon from "@mui/icons-material/Code";

const benefits = [
  {
    icon: <SchoolIcon sx={{ fontSize: 48, color: "var(--primary-blue)" }} />,
    title: "Learn from Experts",
    description: "Access content created by AI professionals who are active in the market, accelerating your learning with practical tips and real experiences.",
    color: "rgba(37,99,235,0.08)",
  },
  {
    icon: <UpdateIcon sx={{ fontSize: 48, color: "#10B981" }} />,
    title: "Always Up-to-date Content",
    description: "Stay on top of the latest AI trends and tools with materials that are constantly reviewed and updated so you never fall behind.",
    color: "rgba(16,185,129,0.08)",
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 48, color: "#F59E0B" }} />,
    title: "Community & Networking",
    description: "Connect with a vibrant community of AI enthusiasts, share experiences, and grow your professional network.",
    color: "rgba(245,158,11,0.08)",
  },
  {
    icon: <CodeIcon sx={{ fontSize: 48, color: "#8B5CF6" }} />,
    title: "Practical & Applicable Examples",
    description: "Learn by doing with real examples and exercises that simulate real-world challenges.",
    color: "rgba(139,92,246,0.08)",
  },
];

export default function BenefitsSection() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1300,
        mx: "auto",
        mt: { xs: 8, md: 12 },
        px: { xs: 2, md: 2 },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          color: "var(--foreground)",
          fontSize: { xs: 24, md: 32 },
          mb: 6,
          textAlign: "center",
        }}
      >
        Why Choose Our Platform
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
          },
          gap: 3,
        }}
      >
        {benefits.map((benefit, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 2,
              height: "100%",
              bgcolor: "#fff",
              boxShadow: "0 2px 8px 0 rgba(37,99,235,0.06)",
              transition: "all 0.2s ease-in-out",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 4px 16px 0 rgba(37,99,235,0.12)",
              },
            }}
          >
            <Stack direction="row" spacing={3} alignItems="flex-start">
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: 2,
                  bgcolor: benefit.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  mt: 0.5,
                }}
              >
                {benefit.icon}
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "var(--foreground)",
                    fontSize: 20,
                    mb: 1,
                  }}
                >
                  {benefit.title}
                </Typography>
                <Typography
                  sx={{
                    color: "var(--footer-text)",
                    fontSize: 15,
                    lineHeight: 1.6,
                  }}
                >
                  {benefit.description}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        ))}
      </Box>
    </Box>
  );
} 