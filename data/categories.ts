export interface Guide {
  id: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  icon_url: string;
  color: string;
  featured?: boolean;
  comingSoon?: boolean;
  guides: string[];
}

export const categories: Category[] = [
  {
    id: "text-generation",
    title: "Text Generation AI",
    description: "Master text-based AI models like ChatGPT and Claude",
    icon_url: "chat",
    color: "#74aa9c",
    featured: true,
    guides: ["chatgpt", "claude"],
  },
  {
    id: "image-generation",
    title: "Image Generation AI",
    description:
      "Create stunning AI-generated images with DALL-E and Midjourney",
    icon_url: "image",
    color: "#e74c3c",
    featured: true,
    guides: ["dalle", "midjourney"],
  },
  {
    id: "multimodal-ai",
    title: "Multimodal AI",
    description: "Explore AI models that can handle multiple types of content",
    icon_url: "layers",
    color: "#8e44ad",
    featured: true,
    guides: ["gemini"],
  },
  {
    id: "content-creation",
    title: "AI Content Creation",
    description: "Learn how to use AI for creating various types of content",
    icon_url: "edit",
    color: "#2ecc71",
    featured: true,
    guides: ["aiContentCreation"],
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering",
    description: "Master the art of writing effective prompts for AI models",
    icon_url: "lightbulb",
    color: "#3498db",
    featured: true,
    guides: ["how-to-write-effective-ai-prompts"],
  },
];
