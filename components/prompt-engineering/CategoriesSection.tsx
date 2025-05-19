"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  FaBook,
  FaLightbulb,
  FaChartLine,
  FaPalette,
  FaCogs,
} from "react-icons/fa";
import CategoryCard from "./CategoryCard";

interface Guide {
  title: string;
  link: string;
}

interface Category {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  count: number;
  featured?: boolean;
  comingSoon?: boolean;
  guides: Guide[];
}

const categories: Category[] = [
  {
    id: "fundamentals",
    title: "Fundamentals of Prompt Engineering",
    description:
      "Master the core concepts and principles of effective prompt engineering",
    icon: <FaBook size={24} />,
    color: "#8e44ad",
    count: 1,
    featured: true,
    guides: [
      {
        title: "How to Write Effective AI Prompts: Complete 2025 Guide",
        link: "/guides/how-to-write-effective-ai-prompts",
      },
    ],
  },
  {
    id: "specialized",
    title: "Specialized Prompt Techniques",
    description:
      "Learn advanced prompt engineering methods for specific use cases",
    icon: <FaLightbulb size={24} />,
    color: "#3498db",
    count: 0,
    comingSoon: true,
    guides: [
      {
        title: "How to Use Chain-of-Thought Prompting",
        link: "/prompt-engineering/how-to-use-chain-of-thought-prompting",
      },
      {
        title: "How to Use Few-Shot Prompting",
        link: "/prompt-engineering/how-to-use-few-shot-prompting",
      },
      {
        title: "How to Use Prompt Templates",
        link: "/prompt-engineering/how-to-use-prompt-templates",
      },
    ],
  },
  {
    id: "business",
    title: "Business Applications",
    description:
      "Apply prompt engineering techniques to business and marketing challenges",
    icon: <FaChartLine size={24} />,
    color: "#2ecc71",
    count: 0,
    comingSoon: true,
    guides: [
      {
        title: "How to Use Prompt Engineering for SEO",
        link: "/prompt-engineering/how-to-use-prompt-engineering-for-seo",
      },
      {
        title: "How to Use Prompt Engineering for Business",
        link: "/prompt-engineering/how-to-use-prompt-engineering-for-business",
      },
    ],
  },
  {
    id: "creative",
    title: "Creative Prompting",
    description:
      "Create stunning visual art and creative content with specialized prompting techniques",
    icon: <FaPalette size={24} />,
    color: "#e74c3c",
    count: 0,
    comingSoon: true,
    guides: [
      {
        title: "How to Create AI Art Prompts",
        link: "/prompt-engineering/how-to-create-ai-art-prompts",
      },
      {
        title: "How to Write Prompts for Image Generation",
        link: "/prompt-engineering/how-to-write-prompts-for-image-generation",
      },
    ],
  },
  {
    id: "optimization",
    title: "Optimization Techniques",
    description:
      "Fine-tune your prompts to get the best possible results from AI tools",
    icon: <FaCogs size={24} />,
    color: "#f39c12",
    count: 0,
    comingSoon: true,
    guides: [
      {
        title: "How to Optimize Prompts for AI Tools",
        link: "/prompt-engineering/how-to-optimize-prompts-for-ai-tools",
      },
    ],
  },
];

export default function CategoriesSection() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ mb: 6 }}>
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          mb: 4,
          fontSize: "1.8rem",
          fontWeight: 700,
        }}
      >
        Prompt Engineering Guides by Category
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {filteredCategories.map((category) => (
          <Box key={category.id}>
            <CategoryCard {...category} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
