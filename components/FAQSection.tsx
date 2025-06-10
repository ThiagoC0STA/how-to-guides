"use client";

import React from "react";
import { Box, Typography, Stack, Paper } from "@mui/material";
import ExpandableSection from "./ExpandableSection";

const faqs = [
  {
    question: "What is included in the subscription?",
    answer: "Our subscription includes access to all guides, tutorials, and practical examples. You'll also get priority support and early access to new content.",
  },
  {
    question: "Can I access the content offline?",
    answer: "Currently, our platform is web-based and requires an internet connection. However, we're working on offline access features for future updates.",
  },
  {
    question: "How often is the content updated?",
    answer: "We update our content regularly to keep up with the latest AI developments. New guides and tutorials are added weekly, and existing content is reviewed monthly.",
  },
  {
    question: "Do I need prior AI experience?",
    answer: "No prior experience is required. Our guides are designed for all skill levels, from beginners to advanced users. We provide step-by-step instructions and explanations.",
  },
  {
    question: "How can I get support if I have questions?",
    answer: "We offer 24/7 support through our help center, email support, and community forum. Premium subscribers also get access to priority support.",
  },
];

export default function FAQSection() {
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
        Frequently Asked Questions
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 2,
          bgcolor: "var(--background)",
          boxShadow: "0 2px 8px 0 rgba(37,99,235,0.06)",
        }}
      >
        <Stack spacing={2}>
          {faqs.map((faq, index) => (
            <ExpandableSection
              key={index}
              title={faq.question}
            >
              <Typography
                sx={{
                  color: "var(--footer-text)",
                  fontSize: 15,
                  lineHeight: 1.6,
                }}
              >
                {faq.answer}
              </Typography>
            </ExpandableSection>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
} 