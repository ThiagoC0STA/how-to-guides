export interface Guide {
  title: string;
  link: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
  count: number;
  featured?: boolean;
  comingSoon?: boolean;
  guides: Guide[];
}

export const categories: Category[] = [
  {
    id: "fundamentals",
    title: "Fundamentals of Prompt Engineering",
    description:
      "Master the core concepts and principles of effective prompt engineering",
    iconName: "book",
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
    iconName: "lightbulb",
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
    iconName: "chart-line",
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
    iconName: "palette",
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
];
