export interface Resource {
  id: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
  featured?: boolean;
  comingSoon?: boolean;
  link: string;
  details: string;
}

export const resources: Resource[] = [
  {
    id: "glossary",
    title: "AI Terminology Glossary",
    description: "Comprehensive definitions of key AI terms and concepts",
    iconName: "book",
    color: "#3498db",
    featured: true,
    link: "/resources/ai-glossary",
    details:
      "Our AI Terminology Glossary provides clear, concise definitions for over 200 AI-related terms. Perfect for beginners and professionals alike, this resource helps you understand the complex language of artificial intelligence.",
  },
  {
    id: "cheatsheet",
    title: "Prompt Engineering Cheat Sheet",
    description: "Quick reference guide for crafting effective AI prompts",
    iconName: "lightbulb",
    color: "#e74c3c",
    featured: true,
    link: "/resources/prompt-cheat-sheet",
    details:
      "The Prompt Engineering Cheat Sheet is your go-to reference for creating powerful prompts across different AI tools. Includes templates, patterns, and best practices for ChatGPT, Midjourney, DALL-E, and Gemini AI.",
  },
  {
    id: "comparison",
    title: "AI Model Comparison",
    description:
      "Side-by-side comparison of popular AI models and their capabilities",
    iconName: "chart-line",
    color: "#2ecc71",
    featured: true,
    link: "/resources/model-comparison",
    details:
      "Our comprehensive AI Model Comparison helps you choose the right tool for your needs. Compare features, pricing, strengths, and limitations of leading AI models including ChatGPT, Gemini AI, Claude, Midjourney, DALL-E, and more.",
  },
  {
    id: "learning",
    title: "AI Learning Paths",
    description: "Structured learning journeys for mastering AI tools",
    iconName: "graduation-cap",
    color: "#9b59b6",
    comingSoon: true,
    link: "/resources/learning-paths",
    details:
      "AI Learning Paths provide step-by-step guidance for mastering specific AI tools and techniques. Each path includes beginner, intermediate, and advanced content to help you progress from novice to expert.",
  },
  {
    id: "faq",
    title: "AI Tools FAQ",
    description: "Answers to frequently asked questions about AI tools",
    iconName: "question-circle",
    color: "#f39c12",
    comingSoon: true,
    link: "/resources/ai-faq",
    details:
      "Our AI Tools FAQ addresses common questions and challenges users face when working with AI tools. Find solutions to technical issues, understand limitations, and learn best practices for getting the most out of AI.",
  },
];
