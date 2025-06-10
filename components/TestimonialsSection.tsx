"use client";

import React from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "AI Researcher",
    quote: "This platform was a game changer for my AI learning journey. The step-by-step guides are clear, practical, and easy to follow.",
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    quote: "The real-world examples and hands-on approach make learning AI tools much more engaging. Highly recommended!",
  },
  {
    name: "Emma Rodriguez",
    role: "Data Scientist",
    quote: "I've tried many AI learning platforms, but this one stands out for its comprehensive content and excellent support.",
  },
  {
    name: "Lucas Silva",
    role: "Product Manager",
    quote: "The platform helped me understand AI in a practical and fast way. The support team is amazing!",
  },
  {
    name: "Julia Müller",
    role: "Machine Learning Engineer",
    quote: "The practical examples and tutorial explanations are the best I've seen. I recommend it to anyone who wants to truly learn AI!",
  },
  {
    name: "David Kim",
    role: "Startup Founder",
    quote: "With these guides, I was able to implement AI in my product in record time. Straight to the point content!",
  },
];

export default function TestimonialsSection() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1300,
        mx: "auto",
        mt: { xs: 8, md: 12 },
        px: { xs: 2, md: 2 },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          color: "var(--foreground)",
          fontSize: { xs: 24, md: 32 },
          mb: 6,
          textAlign: "center",
        }}
      >
        What our users say
      </Typography>

      <Swiper
        modules={[Pagination, A11y]}
        spaceBetween={32}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop
        breakpoints={{
          900: { slidesPerView: 2 },
          1300: { slidesPerView: 3 },
        }}
        style={{ paddingBottom: 64, paddingTop: 28 }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <Box sx={{ position: "relative", pb: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  pt: 8,
                  pb: 4,
                  px: 4,
                  borderRadius: 6,
                  bgcolor: "#fff",
                  boxShadow: "0 6px 32px 0 rgba(37,99,235,0.10)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minHeight: 260,
                  maxWidth: 400,
                  mx: "auto",
                  position: "relative",
                  transition: "all 0.2s cubic-bezier(.4,1.3,.6,1)",
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.04)",
                    boxShadow: "0 12px 40px 0 rgba(37,99,235,0.18)",
                  },
                }}
              >
                <FormatQuoteIcon
                  sx={{
                    color: "var(--primary-blue)",
                    opacity: 0.13,
                    fontSize: 60,
                    position: "absolute",
                    top: 24,
                    right: 24,
                    zIndex: 0,
                  }}
                />
                <Typography
                  sx={{
                    color: "#222",
                    fontSize: 19,
                    lineHeight: 1.8,
                    mb: 3,
                    mt: 1,
                    textAlign: "center",
                    zIndex: 1,
                    fontStyle: "italic",
                    fontWeight: 500,
                  }}
                >
                  {testimonial.quote}
                </Typography>
                <Stack direction="column" alignItems="center" spacing={0.5} sx={{ zIndex: 1 }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "var(--primary-blue)",
                      fontSize: 18,
                    }}
                  >
                    {testimonial.name}
                  </Typography>
                  <Typography
                    sx={{
                      color: "var(--footer-text)",
                      fontSize: 15,
                      fontWeight: 500,
                    }}
                  >
                    {testimonial.role}
                  </Typography>
                </Stack>
              </Paper>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Swiper Dots */}
      <Box
        className="swiper-pagination"
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
          gap: 1.5,
          "& .swiper-pagination-bullet": {
            width: 14,
            height: 14,
            background: "#e0e7ef",
            opacity: 1,
            borderRadius: "50%",
            transition: "all 0.2s",
            border: "2px solid transparent",
          },
          "& .swiper-pagination-bullet-active": {
            background: "var(--primary-blue)",
            border: "2px solid var(--primary-blue)",
            boxShadow: "0 2px 8px 0 rgba(37,99,235,0.15)",
          },
        }}
      />
    </Box>
  );
} 