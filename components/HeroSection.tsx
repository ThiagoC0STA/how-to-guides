"use client";

import React from "react";
import Link from "next/link";
import { Box, Typography, Button, Stack, Chip } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function HeroSection() {
  const currentYear = new Date().getFullYear();

  React.useEffect(() => {
    const initParticles = async () => {
      await loadSlim(window.tsParticles);
    };
    initParticles();
  }, []);

  return (
    <Box
      sx={{
        minHeight: { xs: 420, md: 590 },
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        bgcolor: "var(--background)",
        position: "relative",
        overflow: "hidden",
        px: 2,
        py: { xs: 8, md: 12 },
      }}
    >
      {/* Partículas animadas de fundo */}
      <Box sx={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Particles
          id="tsparticles-hero"
          className="h-full w-full"
          options={{
            fullScreen: false,
            background: { color: { value: "transparent" } },
            fpsLimit: 60,
            particles: {
              number: {
                value: 40,
              },
              color: { value: ["#134CCD", "#3b82f6", "#60a5fa"] },
              shape: { type: "circle" },
              opacity: {
                value: 0.1,
              },
              size: {
                value: { min: 2, max: 5 },
              },
              move: {
                enable: true,
                speed: 0.7,
                direction: "none",
                random: true,
                straight: false,
                outModes: { default: "out" },
              },
              links: {
                enable: true,
                distance: 120,
                color: "#134CCD",
                opacity: 0.1,
                width: 1.2,
              },
            },
            detectRetina: true,
          }}
        />
      </Box>

      <Stack spacing={3} alignItems="center" sx={{ zIndex: 2 }}>
        <Chip
          icon={<RocketLaunchIcon sx={{ color: "var(--primary-blue)" }} />}
          label={
            <Typography
              sx={{
                color: "var(--primary-blue)",
                fontWeight: 700,
                fontSize: 15,
              }}
            >{`NEW ${currentYear}`}</Typography>
          }
          sx={{
            bgcolor: "rgba(37,99,235,0.08)",
            borderRadius: 2,
            px: 2,
            py: 0.5,
            fontWeight: 700,
            letterSpacing: 1,
            mb: 2,
            boxShadow: "0 2px 8px 0 rgba(37,99,235,0.08)",
          }}
        />
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            color: "var(--foreground)",
            fontSize: { xs: 32, md: 48 },
            textAlign: "center",
            lineHeight: 1.15,
            letterSpacing: -1,
            mb: 1,
            textShadow: "0 2px 16px rgba(37,99,235,0.04)",
          }}
        >
          Master AI Tools with{" "}
          <Box component="span" sx={{ color: "var(--primary-blue)" }}>
            Step-by-Step
          </Box>{" "}
          Guides
        </Typography>
        <Typography
          sx={{
            color: "var(--footer-text)",
            fontWeight: 400,
            fontSize: { xs: 17, md: 22 },
            textAlign: "center",
            maxWidth: 600,
            mb: 2,
          }}
        >
          Comprehensive tutorials for beginners and advanced users. Unlock the
          full power of AI with practical, real-world examples.
        </Typography>
        <Link href="/guides" passHref>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "var(--primary-blue)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 17,
              px: 5,
              py: 1.5,
              borderRadius: 2,
              boxShadow: "0 4px 24px 0 rgba(37,99,235,0.10)",
              textTransform: "none",
              transition: "all 0.18s cubic-bezier(.4,0,.2,1)",
              "&:hover": {
                bgcolor: "var(--primary-blue-dark)",
                boxShadow: "0 8px 32px 0 rgba(37,99,235,0.18)",
                transform: "translateY(-2px) scale(1.04)",
              },
            }}
          >
            Explore Guides
          </Button>
        </Link>
      </Stack>
    </Box>
  );
}
