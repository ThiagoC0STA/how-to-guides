"use client";

import React from "react";
import { Box, Typography, Stack, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CodeIcon from "@mui/icons-material/Code";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const steps = [
  {
    icon: <SearchIcon sx={{ fontSize: 40, color: "#fff" }} />,
    title: "Choose Your Path",
    description: "Browse through our comprehensive collection of AI guides and select the one that matches your interests.",
    number: "01",
    color: "#2563EB", // Blue
    gradient: "linear-gradient(90deg, #2563EB 0%, rgba(37,99,235,0.1) 100%)",
  },
  {
    icon: <MenuBookIcon sx={{ fontSize: 40, color: "#fff" }} />,
    title: "Learn Step by Step",
    description: "Follow our detailed, easy-to-understand tutorials with practical examples and explanations.",
    number: "02",
    color: "#7C3AED", // Purple
    gradient: "linear-gradient(90deg, #7C3AED 0%, rgba(124,58,237,0.1) 100%)",
  },
  {
    icon: <CodeIcon sx={{ fontSize: 40, color: "#fff" }} />,
    title: "Practice & Apply",
    description: "Put your knowledge into practice with hands-on exercises and real-world applications.",
    number: "03",
    color: "#059669", // Green
    gradient: "linear-gradient(90deg, #059669 0%, rgba(5,150,105,0.1) 100%)",
  },
  {
    icon: <EmojiEventsIcon sx={{ fontSize: 40, color: "#fff" }} />,
    title: "Master AI Tools",
    description: "Become proficient in using AI tools and techniques to solve real-world problems.",
    number: "04",
    color: "#EA580C", // Orange
    gradient: "linear-gradient(90deg, #EA580C 0%, rgba(234,88,12,0.1) 100%)",
  },
];

export default function HowItWorksSection() {
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
        How It Works
      </Typography>

      <Box
        sx={{
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "80px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "calc(100% - 200px)",
            height: "2px",
            background: "linear-gradient(90deg, #2563EB 0%, #7C3AED 25%, #059669 50%, #EA580C 75%, rgba(234,88,12,0.1) 100%)",
            display: { xs: "none", md: "block" },
          },
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 6, md: 4 }}
          sx={{
            justifyContent: "space-between",
            position: "relative",
            zIndex: 1,
          }}
        >
          {steps.map((step, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 4,
                flex: 1,
                bgcolor: "#fff",
                boxShadow: "0 2px 8px 0 rgba(37,99,235,0.06)",
                position: "relative",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 4px 16px 0 rgba(37,99,235,0.12)",
                },
              }}
            >
              <Stack alignItems="center" textAlign="center">
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    bgcolor: step.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                    position: "relative",
                    "&::after": {
                      content: `"${step.number}"`,
                      position: "absolute",
                      top: -8,
                      right: -6,
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      bgcolor: "#fff",
                      border: `2px solid ${step.color}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      fontWeight: 700,
                      color: step.color,
                    },
                  }}
                >
                  {step.icon}
                </Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "var(--foreground)",
                    fontSize: 18,
                  }}
                >
                  {step.title}
                </Typography>
                <Typography
                  sx={{
                    color: "var(--footer-text)",
                    fontSize: 15,
                    lineHeight: 1.6,
                  }}
                >
                  {step.description}
                </Typography>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Box>
    </Box>
  );
} 