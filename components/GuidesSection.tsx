"use client";

import React, { useState, useEffect } from "react";
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
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";
import { useLoading } from "./LoadingProvider";
import { publicRequest } from "@/utils/apiClient";

interface GuidesSectionProps {
  isPopular?: boolean;
}

interface Category {
  id: string;
  title: string;
  color: string;
}

interface Guide {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
  updated_at: string;
  is_popular: boolean;
  categories: Category[];
}

const FallbackIcon = ({ color }: { color: string }) => (
  <Box
    sx={{
      width: 64,
      height: 64,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 2,
      bgcolor: "#fff",
      boxShadow: `0 2px 8px 0 ${color}22`,
    }}
  >
    <FaRobot size={32} color={color} />
  </Box>
);

export default function GuidesSection({
  isPopular = false,
}: GuidesSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [guides, setGuides] = useState<Guide[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { show: showLoading, hide: hideLoading } = useLoading();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await publicRequest.get("/categories");
        if (data.categories) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch guides
  useEffect(() => {
    let isMounted = true;
    let loadingShown = false;

    const fetchGuides = async () => {
      if (!loadingShown) {
        showLoading();
        loadingShown = true;
      }

      try {
        const { data } = await publicRequest.get(
          `/guides${isPopular ? "?popular=true" : ""}`
        );
        if (data.guides && isMounted) {
          setGuides(data.guides);
        }
      } catch (error) {
        console.error("Error fetching guides:", error);
      } finally {
        if (isMounted && loadingShown) {
          hideLoading();
          loadingShown = false;
        }
      }
    };

    fetchGuides();

    return () => {
      isMounted = false;
      if (loadingShown) {
        hideLoading();
      }
    };
  }, [isPopular]);

  const filteredGuides = React.useMemo(() => {
    return guides.filter((guide) => {
      const matchesSearch =
        guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guide.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        guide.categories.some((cat) => cat.id === selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [guides, searchTerm, selectedCategory]);

  const searchOptions = React.useMemo(() => {
    return guides.map((guide) => guide.title);
  }, [guides]);

  const categoryOptions = ["all", ...categories.map((cat) => cat.id)];

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
            options={searchOptions}
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
                {categoryOptions.map((categoryId) => {
                  const category = categories.find(
                    (cat) => cat.id === categoryId
                  );
                  return (
                    <MenuItem
                      key={categoryId}
                      value={categoryId}
                      sx={{
                        textTransform: "capitalize",
                      }}
                    >
                      {categoryId === "all"
                        ? "All Categories"
                        : category?.title || categoryId}
                    </MenuItem>
                  );
                })}
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
                {categoryOptions.map((categoryId) => {
                  const category = categories.find(
                    (cat) => cat.id === categoryId
                  );
                  return (
                    <Paper
                      key={categoryId}
                      onClick={() => setSelectedCategory(categoryId)}
                      sx={{
                        px: 3,
                        py: 1.5,
                        borderRadius: 2,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        transition: "all 0.2s",
                        bgcolor:
                          selectedCategory === categoryId
                            ? category?.color || "var(--primary-blue)"
                            : "transparent",
                        color:
                          selectedCategory === categoryId
                            ? "#fff"
                            : "var(--foreground)",
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
                        {categoryId === "all"
                          ? "All Categories"
                          : category?.title || categoryId}
                      </Typography>
                    </Paper>
                  );
                })}
              </Box>
            </Box>
          )}
        </Stack>
      )}

      {/* Mensagem quando não há guias */}
      {filteredGuides.length === 0 && (
        <Box sx={{ width: '100%', textAlign: 'center', mt: 8, mb: 8 }}>
          <Typography variant="h6" sx={{ color: 'var(--footer-text)', fontWeight: 500 }}>
            No guides found.
          </Typography>
        </Box>
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
              label={new Date(guide.updated_at).toLocaleDateString()}
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
            <Box
              sx={{
                width: 64,
                height: 64,
                mx: "auto",
                mt: 3,
                mb: 1,
              }}
            >
              {failedImages.has(
                typeof guide.image === "string" ? guide.image : ""
              ) ? (
                <FallbackIcon color={guide.color} />
              ) : (
                <CardMedia
                  component="img"
                  image={
                    typeof guide.image === "string"
                      ? guide.image
                      : URL.createObjectURL(guide.image)
                  }
                  alt={guide.title}
                  onError={() => {
                    if (typeof guide.image === "string" && guide.image) {
                      setFailedImages(
                        (prev) => new Set([...prev, guide.image as string])
                      );
                    }
                  }}
                  sx={{
                    width: 64,
                    height: 64,
                    objectFit: "contain",
                    borderRadius: 2,
                    boxShadow: `0 2px 8px 0 ${guide.color}22`,
                    background: "#fff",
                  }}
                />
              )}
            </Box>
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
              <Link href={`/guides/${guide.id}`} passHref>
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
