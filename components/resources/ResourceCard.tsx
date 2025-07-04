"use client";

import { Box, Typography, Paper, Button } from "@mui/material";
import Link from "next/link";
import {
  FaBook,
  FaLightbulb,
  FaChartLine,
  FaGraduationCap,
  FaQuestionCircle,
  FaLock,
} from "react-icons/fa";
import { Resource } from "@/data/resources";

const iconMap = {
  book: FaBook,
  lightbulb: FaLightbulb,
  "chart-line": FaChartLine,
  "graduation-cap": FaGraduationCap,
  "question-circle": FaQuestionCircle,
};

export default function ResourceCard({
  title,
  description,
  iconName,
  color,
  featured,
  comingSoon,
  link,
  details,
}: Resource) {
  const Icon = iconMap[iconName as keyof typeof iconMap];

  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        minHeight: 380,
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: comingSoon ? "divider" : "divider",
        opacity: comingSoon ? 0.7 : 1,
        transition: "all 0.3s ease",
        position: "relative",
        "&:hover": {
          transform: comingSoon ? "none" : "translateY(-8px)",
          boxShadow: comingSoon ? "none" : "0 12px 24px rgba(0,0,0,0.08)",
          borderColor: comingSoon ? "divider" : color,
        },
      }}
    >
      {featured && (
        <>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 0,
              height: 0,
              borderStyle: "solid",
              borderWidth: "0 70px 70px 0",
              borderColor: `transparent ${color} transparent transparent`,
              zIndex: 1,
            }}
          />
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              top: 18,
              right: 0,
              color: "white",
              fontWeight: 700,
              fontSize: "0.70rem",
              transform: "rotate(45deg)",
              zIndex: 2,
            }}
          >
            Featured
          </Typography>
        </>
      )}

      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
          position: "relative",
          pb: 0,
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: comingSoon ? "action.hover" : `${color}15`,
            color: comingSoon ? "text.secondary" : color,
            flexShrink: 0,
            transition: "all 0.3s ease",
          }}
        >
          {comingSoon ? <FaLock size={20} /> : <Icon size={24} />}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: "1.1rem",
              mb: 1,
              color: comingSoon ? "text.secondary" : "text.primary",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              lineHeight: 1.6,
              mb: 2,
            }}
          >
            {description}
          </Typography>

          {comingSoon ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                bgcolor: "action.hover",
                p: 1.5,
                borderRadius: 2,
                mb: 1,
              }}
            >
              <FaLock size={14} color="#666" />
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                }}
              >
                Coming Soon
              </Typography>
            </Box>
          ) : null}
        </Box>
      </Box>

      <Box
        sx={{
          px: 3,
          pb: 2,
          flexGrow: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            lineHeight: 1.6,
            fontSize: "0.875rem",
          }}
        >
          {details}
        </Typography>
      </Box>

      <Box
        sx={{
          p: 2,
          borderTop: "1px solid",
          borderColor: "divider",
          textAlign: "center",
        }}
      >
        {!comingSoon && (
          <Link href={link} passHref>
            <Button
              component="a"
              variant="outlined"
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                py: 1,
                borderColor: "divider",
                color: "text.secondary",
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: color,
                  color: color,
                  bgcolor: `${color}08`,
                },
              }}
            >
              View Resource
            </Button>
          </Link>
        )}
      </Box>
    </Paper>
  );
} 