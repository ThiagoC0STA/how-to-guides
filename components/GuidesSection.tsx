"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Autocomplete,
  Paper,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { GUIDES } from "@/data/guides";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

interface GuidesSectionProps {
  isPopular?: boolean;
}

export default function GuidesSection({
  isPopular = false,
}: GuidesSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const categories = [
    "all",
    ...new Set(GUIDES.flatMap((guide) => guide.category)),
  ].sort();

  const filteredGuides = GUIDES.filter((guide) => {
    if (isPopular) {
      return guide.featured;
    }

    const matchesSearch =
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || guide.category.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1300,
        mx: "auto",
        mt: { xs: isPopular ? 6 : 2, md: isPopular ? 12 : 1 },
        px: { xs: 2, md: 2 },
      }}
    >
      {isPopular && (
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: "var(--foreground)",
            fontSize: { xs: 24, md: 32 },
            mb: 4,
          }}
        >
          Popular Guides
        </Typography>
      )}

      {!isPopular && (
        <Stack spacing={3}>
          <Autocomplete
            freeSolo
            options={GUIDES.map((guide) => guide.title)}
            value={searchTerm}
            onChange={(_, newValue) => setSearchTerm(newValue || "")}
            onInputChange={(_, newInputValue) => setSearchTerm(newInputValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search guides..."
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaSearch color="#666" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    boxShadow: "0 2px 8px 0 rgba(37,99,235,0.06)",
                  },
                }}
              />
            )}
          />

          {isMobile ? (
            <FormControl fullWidth>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                value={selectedCategory}
                label="Category"
                onChange={(e) => setSelectedCategory(e.target.value)}
                sx={{
                  borderRadius: 2,
                  boxShadow: "0 2px 8px 0 rgba(37,99,235,0.06)",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--primary-blue)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--primary-blue)",
                  },
                }}
              >
                {categories.map((category) => (
                  <MenuItem
                    key={category}
                    value={category}
                    sx={{
                      textTransform: "capitalize",
                    }}
                  >
                    {category.replace(/-/g, " ")}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                  flexWrap: "wrap",
                  mt: 2,
                  mb: 2,
                }}
              >
                {categories.map((category) => (
                  <Paper
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    sx={{
                      px: 3,
                      py: 1.5,
                      borderRadius: 2,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "all 0.2s",
                      bgcolor:
                        selectedCategory === category
                          ? "var(--primary-blue)"
                          : "transparent",
                      color:
                        selectedCategory === category
                          ? "#fff"
                          : "var(--foreground)",
                      boxShadow:
                        selectedCategory === category
                          ? "0 2px 8px 0 rgba(37,99,235,0.2)"
                          : "0 2px 8px 0 rgba(37,99,235,0.06)",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px 0 rgba(37,99,235,0.1)",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        textTransform: "capitalize",
                      }}
                    >
                      {category.replace(/-/g, " ")}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Box>
          )}
        </Stack>
      )}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: 3, md: 4 },
          justifyContent: { xs: "center", md: "flex-start" },
          mt: 4,
        }}
      >
        {filteredGuides.map((guide) => (
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
