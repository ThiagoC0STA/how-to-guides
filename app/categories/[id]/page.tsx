"use client";

import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
  Paper,
} from "@mui/material";
import Link from "next/link";
import { categories } from "@/data/categories";
import { GUIDES } from "@/data/guides";
import { FaHome, FaBook, FaArrowRight, FaQuestionCircle } from "react-icons/fa";
import { notFound } from "next/navigation";
import React, { use } from "react";
import iconMap from "@/data/iconMap";
import Image from "next/image";

export default function CategoryPage({ params }: any) {
  const { id }: any = use(params);
  const category = categories.find((cat) => cat.id === id);

  if (!category) {
    notFound();
  }

  const guides = GUIDES.filter((guide) => category.guides.includes(guide.id));

  return (
    <Container
      maxWidth={false}
      sx={{ maxWidth: "1440px", px: { xs: 2, md: 6 } }}
    >
      {/* Breadcrumbs */}
      <Box sx={{ py: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <Breadcrumbs
          separator={<FaArrowRight size={12} />}
          aria-label="breadcrumb"
          sx={{
            flex: 1,
            "& .MuiBreadcrumbs-separator": {
              color: "text.secondary",
              mx: 1,
            },
          }}
        >
          <MuiLink
            component={Link}
            href="/"
            underline="hover"
            sx={{
              display: "flex",
              alignItems: "center",
              color: "text.secondary",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            <FaHome size={14} style={{ marginRight: 6 }} />
            Home
          </MuiLink>
          <MuiLink
            component={Link}
            href="/prompt-engineering"
            underline="hover"
            sx={{
              display: "flex",
              alignItems: "center",
              color: "text.secondary",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            <FaBook size={14} style={{ marginRight: 6 }} />
            Prompt Engineering
          </MuiLink>
          <Typography
            sx={{
              color: "text.primary",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            {category.title}
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Header */}
      <Box sx={{ mb: 8, textAlign: "center", position: "relative", mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
            gap: { xs: 1.5, sm: 2 },
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              bgcolor: `${category.color}22`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 4px 24px ${category.color}33`,
              mb: { xs: 1, sm: 0 },
              mr: { xs: 0, sm: 2 },
            }}
          >
            {iconMap[category.iconName as keyof typeof iconMap] ? (
              React.createElement(
                iconMap[category.iconName as keyof typeof iconMap],
                { size: 36, color: category.color }
              )
            ) : (
              <FaQuestionCircle size={36} color={category.color} />
            )}
          </Box>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2rem", md: "3.2rem" },
              fontWeight: 900,
              mb: 0,
              background: `linear-gradient(90deg, ${category.color}, ${category.color}cc 80%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              letterSpacing: -1,
              lineHeight: 1.1,
              textShadow: `0 2px 24px ${category.color}22`,
              mt: { xs: 1, sm: 0 },
            }}
          >
            {category.title}
          </Typography>
        </Box>
        <Typography
          variant="h5"
          sx={{
            color: "text.secondary",
            maxWidth: 800,
            mx: "auto",
            lineHeight: 1.6,
            fontSize: { xs: "1.1rem", md: "1.25rem" },
            mb: 2,
          }}
        >
          {category.description}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            color: category.color,
            fontWeight: 700,
            mb: 1,
            fontSize: "1.1rem",
          }}
        >
          {guides.length} {guides.length === 1 ? "Guide" : "Guides"}
        </Typography>
      </Box>

      {/* Guides Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: 4,
          mb: 12,
        }}
      >
        {guides.map((guide) => (
          <Box key={guide.id}>
            <Paper
              elevation={0}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
                transition: "all 0.3s cubic-bezier(.4,2,.3,1)",
                position: "relative",
                "&:hover": {
                  transform: "translateY(-8px) scale(1.03)",
                },
              }}
            >
              {guide.featured && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bgcolor: category.color,
                    color: "white",
                    px: 2,
                    py: 0.5,
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    borderBottomLeftRadius: 12,
                    zIndex: 2,
                  }}
                >
                  Featured
                </Box>
              )}
              <Box
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  alignItems: "flex-start",
                  gap: 2,
                }}
              >
                {guide.image && (
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      mb: 1,
                      borderRadius: 2,
                      overflow: "hidden",
                      boxShadow: `0 2px 8px ${category.color}22`,
                    }}
                  >
                    <Image
                      src={guide.image}
                      width={48}
                      height={48}
                      alt={guide.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                )}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: "1.15rem",
                    color: "text.primary",
                  }}
                >
                  {guide.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.6,
                    flexGrow: 1,
                  }}
                >
                  {guide.description}
                </Typography>
                {guide.overview?.bullets?.find((b: string) =>
                  b.toLowerCase().includes("reading time")
                ) && (
                  <Typography
                    variant="caption"
                    sx={{ color: category.color, fontWeight: 600, mt: 1 }}
                  >
                    {guide.overview.bullets.find((b: string) =>
                      b.toLowerCase().includes("reading time")
                    )}
                  </Typography>
                )}
                <Link href={`/guides/${guide.id}`} passHref>
                  <MuiLink
                    sx={{
                      color: category.color,
                      textDecoration: "none",
                      fontWeight: 600,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 1,
                      transition: "all 0.2s ease",
                      mt: 2,
                      fontSize: "1rem",
                      "&:hover": {
                        color: category.color,
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    Read Guide
                    <FaArrowRight size={14} />
                  </MuiLink>
                </Link>
              </Box>
            </Paper>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
