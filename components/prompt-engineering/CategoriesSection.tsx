"use client";

import { useState } from "react";
import { Box, Typography, TextField, InputAdornment, IconButton } from "@mui/material";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CategoryCard from "./CategoryCard";
import { categories } from "@/data/categories";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function CategoriesSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [swiper, setSwiper] = useState<any>(null);

  const filteredCategories = categories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
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

        <Box sx={{ position: 'relative', maxWidth: 1200, mx: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={() => swiper?.slidePrev()}
              sx={{
                display: { xs: 'none', md: 'flex' },
                bgcolor: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                '&:hover': {
                  bgcolor: '#f5f5f5',
                },
              }}
            >
              <FaChevronLeft />
            </IconButton>

            <Box sx={{ flex: 1, overflow: 'hidden' }}>
              <Swiper
                onSwiper={setSwiper}
                modules={[Pagination, Autoplay]}
                spaceBetween={24}
                slidesPerView={3}
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true
                }}
                loop={true}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  640: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
                style={{
                  padding: '20px 0 40px',
                }}
              >
                {filteredCategories.map((category) => (
                  <SwiperSlide key={category.id}>
                    <Box
                      sx={{
                        transition: "transform 0.2s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                        },
                      }}
                    >
                      <CategoryCard {...category} />
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>

            <IconButton
              onClick={() => swiper?.slideNext()}
              sx={{
                display: { xs: 'none', md: 'flex' },
                bgcolor: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                '&:hover': {
                  bgcolor: '#f5f5f5',
                },
              }}
            >
              <FaChevronRight />
            </IconButton>
          </Box>
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
              Try adjusting your search terms to find what you&apos;re looking for.
            </Typography>
          </Box>
        )}
      </Box>

      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #e0e0e0;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #1a237e;
        }
      `}</style>
    </Box>
  );
}
