"use client";

import React from "react";
import { Box, Paper } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const partners = [
  {
    name: "Claude",
    logo: "/images/partners/claude.svg",
  },
  {
    name: "Gemini",
    logo: "/images/partners/gemini.png",
  },
  {
    name: "Cursor",
    logo: "/images/partners/cursor.png",
  },
  {
    name: "Perplexity",
    logo: "/images/partners/perplexity.png",
  },
  {
    name: "DeepSeek",
    logo: "/images/partners/deepseek.svg",
  },
  {
    name: "Manus",
    logo: "/images/partners/manus.png",
  },
  {
    name: "Midjourney",
    logo: "/images/partners/midjourney.png",
  },
  {
    name: "n8n",
    logo: "/images/partners/n8n.png",
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
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
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
                  height: { xs: 80, md: 128 },
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
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
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
