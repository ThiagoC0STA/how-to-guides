"use client";

import { useState } from "react";
import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { resources } from "@/data/resources";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ResourceCard from "./ResourceCard";

export default function CategoriesSection() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResources = resources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
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
        Browse Resources by Category
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
        Explore our comprehensive collection of AI resources, organized by
        category to help you master different aspects of AI tools and
        techniques.
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
          placeholder="Search resources..."
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

      <Box sx={{ position: "relative", maxWidth: 1200, mx: "auto" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ flex: 1, overflow: "hidden" }}>
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={3}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
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
                padding: "20px 0 40px",
              }}
            >
              {filteredResources.map((resource) => (
                <SwiperSlide key={resource.id}>
                  <Box
                    sx={{
                      transition: "transform 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <ResourceCard {...resource} />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Box>
      </Box>

      {filteredResources.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            color: "text.secondary",
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            No resources found
          </Typography>
          <Typography>
            Try adjusting your search terms to find what you&apos;re looking
            for.
          </Typography>
        </Box>
      )}

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
