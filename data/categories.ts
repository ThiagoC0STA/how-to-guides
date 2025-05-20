export interface Guide {
  id: string;
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
  guides: string[];
}

export const categories: Category[] = [
  {
    id: "text-generation",
    title: "Text Generation AI",
    description: "Master text-based AI models like ChatGPT and Claude",
    iconName: "chat",
    color: "#74aa9c",
    count: 2,
    featured: true,
    guides: ["chatgpt", "claude"],
  },
  {
    id: "image-generation",
    title: "Image Generation AI",
    description:
      "Create stunning AI-generated images with DALL-E and Midjourney",
    iconName: "image",
    color: "#e74c3c",
    count: 2,
    featured: true,
    guides: ["dalle", "midjourney"],
  },
  {
    id: "multimodal-ai",
    title: "Multimodal AI",
    description: "Explore AI models that can handle multiple types of content",
    iconName: "layers",
    color: "#8e44ad",
    count: 1,
    featured: true,
    guides: ["gemini"],
  },
  {
    id: "content-creation",
    title: "AI Content Creation",
    description: "Learn how to use AI for creating various types of content",
    iconName: "edit",
    color: "#2ecc71",
    count: 1,
    featured: true,
    guides: ["aiContentCreation"],
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering",
    description: "Master the art of writing effective prompts for AI models",
    iconName: "lightbulb",
    color: "#3498db",
    count: 1,
    featured: true,
    guides: ["how-to-write-effective-ai-prompts"],
  },
];
