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
import LoadingOverlay from "@/components/LoadingOverlay";
import { publicRequest } from "@/utils/apiClient";
import { useSearchParams } from "next/navigation";
import { useGlobalStore } from "@/store/globalStore";

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
  created_at: string;
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

// Helper function to convert title to slug
const titleToSlug = (title: string): string => {
  return title.toLowerCase().replace(/\s+/g, "-");
};

let didSyncCategoryFromUrl = false;

export default function GuidesSection({
  isPopular = false,
}: GuidesSectionProps) {
  const searchParams = useSearchParams();
  const { category, setCategory } = useGlobalStore();
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(category);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [guides, setGuides] = useState<Guide[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const rowsPerPage = isPopular ? 6 : 9;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    let isMounted = true;
    const fetchAll = async () => {
      setIsLoading(true);
      try {
        let catRes: { data: { categories: Category[] } } = {
          data: { categories: [] },
        };
        let guidesRes;
        if (isPopular) {
          guidesRes = await publicRequest.get(
            `/guides?page=${page}&limit=6&popular=true`
          );
        } else {
          [catRes, guidesRes] = await Promise.all([
            publicRequest.get("/categories"),
            publicRequest.get(
              `/guides?page=${page}&limit=${rowsPerPage}` +
                (searchTerm
                  ? `&search=${encodeURIComponent(searchTerm)}`
                  : "") +
                (selectedCategory !== "all"
                  ? `&category=${encodeURIComponent(selectedCategory)}`
                  : "")
            ),
          ]);
        }
        if (isMounted) {
          if (catRes.data.categories) setCategories(catRes.data.categories);
          if (guidesRes.data.guides) {
            setGuides(guidesRes.data.guides);
            setTotalCount(guidesRes.data.totalCount || 0);
          }
        }
        // Only sync category from URL if not popular
        if (!isPopular) {
          const categoryParam = searchParams.get("category");
          if (
            !didSyncCategoryFromUrl &&
            categoryParam &&
            catRes.data.categories
          ) {
            const category = catRes.data.categories.find(
              (cat: Category) => titleToSlug(cat.title) === categoryParam
            );
            if (category) {
              setSelectedCategory(category.id);
            }
            didSyncCategoryFromUrl = true;
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchAll();

    return () => {
      isMounted = false;
    };
  }, [
    isPopular,
    page,
    searchTerm,
    selectedCategory,
    rowsPerPage,
    searchParams,
  ]);

  useEffect(() => {
    if (!isPopular) setPage(0);
  }, [selectedCategory]);

  const filteredGuides = guides;

  const categoryOptions = ["all", ...categories.map((cat) => cat.id)];

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Only sync Zustand and local state for category if not popular
  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setCategory(catId);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1300,
        mx: "auto",
        mt: { xs: isPopular ? 6 : 2, md: isPopular ? 12 : 1 },
        px: { xs: 2, md: 2 },
        position: "relative",
      }}
    >
      {isLoading && <LoadingOverlay />}

      {isPopular && (
        <Typography
          sx={{
            fontWeight: 700,
            color: "var(--foreground)",
            fontSize: { xs: 24, md: 32 },
            mb: 4,
          }}
        >
          Popular Guides
        </Typography>
      )}

      {/* Only show filters/search if not popular */}
      {!isPopular && (
        <Stack spacing={3}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              fullWidth
              placeholder="Search guides..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setSearchTerm(searchInput);
                  setPage(0);
                }
              }}
              InputProps={{
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
            <Button
              variant="contained"
              sx={{
                height: "52px !important",
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                marginTop: "8px",
              }}
              onClick={() => {
                setSearchTerm(searchInput);
                setPage(0);
              }}
            >
              Search
            </Button>
          </Box>

          {isMobile ? (
            <FormControl fullWidth>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                value={selectedCategory}
                label="Category"
                onChange={(e) => handleCategoryChange(e.target.value as string)}
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
                      onClick={() => handleCategoryChange(categoryId)}
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
        <Box sx={{ width: "100%", textAlign: "center", mt: 8, mb: 8 }}>
          <Typography sx={{ color: "var(--footer-text)", fontWeight: 500 }}>
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
              label={new Date(guide.created_at).toLocaleDateString()}
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
              <Link href={`/guide/${titleToSlug(guide.title)}`} passHref>
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

      {/* Pagination controls */}
      {totalCount > rowsPerPage && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 4 }}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{
              bgcolor: "var(--card-bg, #fff)",
              borderRadius: 3,
              px: 3,
              py: 1.5,
              boxShadow: "0 2px 16px 0 rgba(37,99,235,0.06)",
            }}
          >
            <Button
              onClick={() => handlePageChange(null, page - 1)}
              disabled={page === 0}
              sx={{
                color: "var(--foreground)",
                fontWeight: 600,
                minWidth: 100,
                borderRadius: 2,
                textTransform: "none",
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: "var(--primary-blue)15",
                  color: "var(--primary-blue)",
                },
                "&:disabled": {
                  color: "var(--footer-text)",
                  bgcolor: "transparent",
                },
              }}
            >
              Previous
            </Button>
            <Box
              sx={{
                px: 3,
                py: 1,
                borderRadius: 2,
                bgcolor: "var(--primary-blue)15",
                color: "var(--primary-blue)",
                fontWeight: 600,
              }}
            >
              {page + 1} / {Math.ceil(totalCount / rowsPerPage)}
            </Box>
            <Button
              onClick={() => handlePageChange(null, page + 1)}
              disabled={page >= Math.ceil(totalCount / rowsPerPage) - 1}
              sx={{
                color: "var(--foreground)",
                fontWeight: 600,
                minWidth: 100,
                borderRadius: 2,
                textTransform: "none",
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: "var(--primary-blue)15",
                  color: "var(--primary-blue)",
                },
                "&:disabled": {
                  color: "var(--footer-text)",
                  bgcolor: "transparent",
                },
              }}
            >
              Next
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
