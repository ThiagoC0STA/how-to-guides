"use client";

import { Paper, Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  color: string;
}

export default function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        borderRadius: 2,
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
          borderColor: color,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            color: "text.secondary",
            fontWeight: 500,
            fontSize: "0.875rem",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: 1.5,
            backgroundColor: `${color}15`,
            color: color,
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: `${color}25`,
              transform: "scale(1.1)",
            },
          }}
        >
          {icon}
        </Box>
      </Box>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          color: "text.primary",
          lineHeight: 1.2,
          letterSpacing: "-1px",
        }}
      >
        {value.toLocaleString()}
      </Typography>
    </Paper>
  );
} 