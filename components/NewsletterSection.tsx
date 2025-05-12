"use client";

import React, { useState } from "react";
import { Box, Typography, TextField, Button, Chip, Fade } from "@mui/material";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Add integration logic here
  };

  return (
    <Box
      sx={{
        width: "100%",
        px: { xs: 2, md: 2 },
        py: { xs: 6, md: 10 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: 1300,
        mx: "auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
          bgcolor: "var(--card-bg, #fff)",
          borderRadius: 5,
          px: { xs: 2, sm: 5 },
          py: { xs: 4, sm: 6 },
          textAlign: "center",
          mx: "auto",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Chip
          label="No spam, ever!"
          size="small"
          sx={{
            position: "absolute",
            top: 24,
            right: 24,
            bgcolor: "var(--primary, #2563eb)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: 0.2,
            display: { xs: "none", sm: "inline-flex" },
          }}
        />
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            color: "var(--foreground)",
            mb: 1.5,
            fontSize: { xs: 24, sm: 30 },
            letterSpacing: -1,
          }}
        >
          Get Our AI Newsletter
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "var(--footer-text)",
            mb: 4,
            fontSize: { xs: 15, sm: 18 },
            fontWeight: 500,
            maxWidth: 640,
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          Stay updated with the latest AI tools, guides and techniques. Only the
          best content, straight to your inbox.
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: 1,
            mb: 2,
            position: "relative",
            width: "100%",
            maxWidth: 440,
            mx: "auto",
          }}
        >
          <TextField
            type="email"
            required
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitted}
            sx={{
              flex: 1,
              bgcolor: "#fff",
              borderRadius: 4,
              input: {
                color: "var(--foreground)",
                fontWeight: 500,
                fontSize: 16,
                px: 2,
                py: 1.5,
              },
              boxShadow: "0 1px 4px 0 rgba(37,99,235,0.06)",
              border: "1.5px solid var(--border, #e5e7eb)",
              transition: "border-color 0.18s cubic-bezier(.4,0,.2,1)",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&:hover": {
                borderColor: "var(--primary, #2563eb)",
              },
              "&.Mui-focused": {
                borderColor: "var(--primary, #2563eb)",
                boxShadow: "0 2px 8px 0 rgba(37,99,235,0.10)",
              },
              width: { xs: "100%", sm: 260 },
              pr: { sm: 0 },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={submitted}
            sx={{
              bgcolor: "var(--primary, #2563eb)",
              color: "#fff",
              fontWeight: 700,
              borderRadius: 4,
              px: 4,
              py: 1.5,
              fontSize: 16,
              boxShadow: "0 2px 8px 0 rgba(37,99,235,0.10)",
              textTransform: "none",
              transition: "all 0.18s cubic-bezier(.4,0,.2,1)",
              zIndex: 1,
              width: { xs: "100%", sm: "auto" },
              height: { sm: 49 },
              "&:hover": {
                bgcolor: "var(--primary, #2563eb)",
                filter: "brightness(1.08)",
                boxShadow: "0 4px 16px 0 rgba(37,99,235,0.18)",
                transform: "scale(1.04)",
              },
              mt: { xs: 2, sm: 0 },
            }}
          >
            {submitted ? "Subscribed!" : "Subscribe"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
