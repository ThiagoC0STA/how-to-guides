import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import { GUIDES } from "../data/guides";
import Link from "next/link";

export default function PopularGuidesSection() {
  const guides = GUIDES.filter((g) => g.featured);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1300,
        mx: "auto",
        mt: { xs: 6, md: 12 },
        px: { xs: 2, md: 2 },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          mb: 4,
          color: "var(--foreground)",
          fontSize: { xs: 24, md: 32 },
        }}
      >
        Popular Guides
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: 3, md: 4 },
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        {guides.map((guide) => (
          <Card
            key={guide.id}
            sx={{
              width: { xs: "100%", md: 400 },
              minHeight: 340,
              display: "flex",
              flexDirection: "column",
              borderRadius: 3,
              boxShadow: "0 2px 16px 0 rgba(37,99,235,0.06)",
              border: `2px solid transparent`,
              transition: "all 0.18s cubic-bezier(.4,0,.2,1)",
              position: "relative",
              "&:hover": {
                boxShadow: `0 8px 32px 0 ${guide.color}33`,
                borderColor: guide.color,
                transform: "translateY(-4px) scale(1.025)",
              },
              bgcolor: "var(--card-bg, #fff)",
              m: 0,
            }}
          >
            {/* Card accent color bar */}
            <Box
              sx={{
                height: 6,
                width: "100%",
                bgcolor: guide.color,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              }}
            />
            {/* Last updated chip */}
            <Chip
              label={guide.lastUpdated}
              size="small"
              sx={{
                position: "absolute",
                top: 16,
                left: 6,
                bgcolor: "#f3f4f6",
                color: "#000",
                fontWeight: 600,
                fontSize: 10,
                borderRadius: 2,
                paddingInline: 0.7,
                textTransform: "capitalize",
                opacity: 0.6,
              }}
            />
            {/* Guide image */}
            <CardMedia
              component="img"
              image={guide.image}
              alt={guide.title}
              sx={{
                width: 64,
                height: 64,
                objectFit: "contain",
                mx: "auto",
                mt: 3,
                mb: 1,
                borderRadius: 2,
                boxShadow: `0 2px 8px 0 ${guide.color}22`,
                background: "#fff",
              }}
            />
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                pb: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "var(--foreground)",
                  mb: 1,
                  fontSize: 20,
                }}
              >
                {guide.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "var(--footer-text)", mb: 2, minHeight: 48 }}
              >
                {guide.description}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Link href={`/guides/${guide.id}`} passHref legacyBehavior>
                <Button
                  variant="contained"
                  size="medium"
                  sx={{
                    bgcolor: guide.color,
                    color: "#fff",
                    fontWeight: 700,
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    textTransform: "none",
                    boxShadow: `0 2px 8px 0 ${guide.color}22`,
                    transition: "all 0.18s cubic-bezier(.4,0,.2,1)",
                    "&:hover": {
                      bgcolor: guide.color,
                      filter: "brightness(1.08)",
                      boxShadow: `0 4px 16px 0 ${guide.color}44`,
                      transform: "scale(1.04)",
                    },
                  }}
                >
                  Read Guide
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
