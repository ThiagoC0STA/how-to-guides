"use client";

import React from "react";
import { Box, Paper } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const partners = [
  {
    name: "OpenAI",
    logo: "https://logo.clearbit.com/openai.com",
  },
  {
    name: "Anthropic",
    logo: "https://logo.clearbit.com/anthropic.com",
  },
  {
    name: "Stability AI",
    logo: "https://logo.clearbit.com/stability.ai",
  },
  {
    name: "Hugging Face",
    logo: "https://logo.clearbit.com/huggingface.co",
  },
  {
    name: "Cohere",
    logo: "https://logo.clearbit.com/cohere.com",
  },
  {
    name: "Google DeepMind",
    logo: "https://logo.clearbit.com/deepmind.com",
  },
  {
    name: "Meta AI",
    logo: "https://logo.clearbit.com/facebook.com",
  },
];

export default function PartnersSection() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1300,
        mx: "auto",
        mt: { xs: 4, md: 8 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          bgcolor: "var(--background)",
        }}
      >
        <Swiper
          modules={[Autoplay]}
          slidesPerView={2}
          spaceBetween={20}
          loop
          autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
          speed={3500}
          grabCursor
          allowTouchMove={false}
          breakpoints={{
            0: { slidesPerView: 2, spaceBetween: 16 },
            400: { slidesPerView: 2.5, spaceBetween: 20 },
            600: { slidesPerView: 3, spaceBetween: 24 },
            900: { slidesPerView: 4, spaceBetween: 32 },
            1200: { slidesPerView: 5, spaceBetween: 40 },
          }}
          style={{ width: "100%" }}
        >
          {partners.map((partner, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: { xs: 40, sm: 50, md: 60 },
                  filter: "grayscale(100%)",
                  opacity: 0.6,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    filter: "grayscale(0%)",
                    opacity: 1,
                  },
                }}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  style={{
                    maxWidth: 110,
                    minWidth: 60,
                    maxHeight: 36,
                    minHeight: 24,
                    objectFit: "contain",
                    width: "100%",
                  }}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Paper>
    </Box>
  );
} 