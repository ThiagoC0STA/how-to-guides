"use client";

import { useState } from "react";
import { Box, Typography, TextField, InputAdornment, Container } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import CategoryCard from "./CategoryCard";
import { categories } from "@/data/categories";

export default function CategoriesSection() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 8 }}>
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            mb: 2,
            fontSize: { xs: "1.8rem", md: "2.6rem" },
            fontWeight: 800,
            letterSpacing: -0.5, 
            pt: 4,
          }}
        >
          Prompt Engineering Guides by Category
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            mb: 4,
            color: "text.secondary",
            fontSize: { xs: "1rem", md: "1.1rem" },
            maxWidth: 600,
            mx: "auto",
          }}
        >
          Explore our comprehensive collection of prompt engineering guides, organized by category to help you master different aspects of AI prompting.
        </Typography>

        <Box
          sx={{
            maxWidth: 500,
            mx: "auto",
            mb: 6,
          }}
        >
          <TextField
            fullWidth
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch color="#666" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                bgcolor: "background.paper",
                "& fieldset": {
                  borderColor: "divider",
                },
                "&:hover fieldset": {
                  borderColor: "primary.main",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "primary.main",
                },
              },
            }}
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: { xs: 2, md: 3 },
          }}
        >
          {filteredCategories.map((category) => (
            <Box 
              key={category.id}
              sx={{
                transition: "transform 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
            >
              <CategoryCard {...category} />
            </Box>
          ))}
        </Box>

        {filteredCategories.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              color: "text.secondary",
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              No categories found
            </Typography>
            <Typography>
              Try adjusting your search terms to find what you're looking for.
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}
