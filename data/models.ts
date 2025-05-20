interface Model {
  name: string;
  company: string;
  releaseDate: string;
  description: string;
  strengths: string[];
  limitations: string[];
  useCases: string[];
  pricing: {
    free: string;
    paid: string;
    api: string;
  };
  link: string | null;
}

interface ModelData {
  [key: string]: Model[];
}

export const modelData: ModelData = {
  text: [
    {
      name: "ChatGPT (GPT-4)",
      company: "OpenAI",
      releaseDate: "March 2023",
      description:
        "GPT-4 is OpenAI's most advanced large language model, capable of generating human-like text, solving complex problems, and handling nuanced instructions.",
      strengths: [
        "Excellent reasoning and problem-solving capabilities",
        "Strong performance on academic and professional exams",
        "Good at following complex, multi-step instructions",
        "Reduced hallucinations compared to previous versions",
        "Capable of understanding and generating code",
      ],
      limitations: [
        "Limited knowledge cutoff (training data ends at a specific date)",
        "Can still produce convincing but incorrect information",
        "Subscription required for full capabilities",
        "No direct internet access for real-time information",
        "Text-only input in base version (multimodal with plugins)",
      ],
      useCases: [
        "Content creation and editing",
        "Programming assistance",
        "Research and analysis",
        "Educational tutoring",
        "Customer service automation",
      ],
      pricing: {
        free: "Limited version (GPT-3.5) available for free",
        paid: "GPT-4 requires ChatGPT Plus subscription ($20/month)",
        api: "API access available with token-based pricing",
      },
      link: "/guides/chatgpt-for-beginners",
    },
    {
      name: "Claude 2",
      company: "Anthropic",
      releaseDate: "July 2023",
      description:
        "Claude is Anthropic's conversational AI assistant designed with a focus on helpfulness, harmlessness, and honesty. It excels at thoughtful dialogue and complex reasoning tasks.",
      strengths: [
        "Excellent at following nuanced instructions",
        "Strong reasoning capabilities",
        "Designed with safety and ethical considerations",
        "Large context window (100K tokens)",
        "Good at avoiding harmful or inappropriate content",
      ],
      limitations: [
        "Limited knowledge cutoff (training data ends at a specific date)",
        "Can still produce hallucinations",
        "Less widespread adoption than some competitors",
        "Text-only input and output",
        "No built-in function calling or plugins",
      ],
      useCases: [
        "Long-form content analysis and generation",
        "Research assistance",
        "Customer support",
        "Educational content creation",
        "Document summarization",
      ],
      pricing: {
        free: "Limited free tier available",
        paid: "Claude Pro subscription ($20/month)",
        api: "API access available with token-based pricing",
      },
      link: null,
    },
    {
      name: "LLaMA 2",
      company: "Meta",
      releaseDate: "July 2023",
      description:
        "LLaMA 2 is Meta's open-source large language model designed for research and commercial use. Available in multiple sizes (7B, 13B, 70B parameters).",
      strengths: [
        "Open-source and free for research and commercial use",
        "Multiple model sizes for different deployment needs",
        "Can be fine-tuned for specific applications",
        "Can be run locally with sufficient hardware",
        "Active community development and improvements",
      ],
      limitations: [
        "Requires technical expertise to deploy",
        "Significant hardware requirements for larger models",
        "Performance varies based on model size",
        "Less refined than some commercial alternatives",
        "Requires fine-tuning for specific applications",
      ],
      useCases: [
        "Research and experimentation",
        "Custom AI application development",
        "Self-hosted AI solutions",
        "Fine-tuning for domain-specific applications",
        "Edge computing applications (smaller models)",
      ],
      pricing: {
        free: "Free for research and commercial use",
        paid: "N/A",
        api: "Self-hosted or through third-party providers",
      },
      link: null,
    },
    {
      name: "PaLM 2",
      company: "Google",
      releaseDate: "May 2023",
      description:
        "PaLM 2 is Google's large language model that powers many Google AI products. It features improved multilingual capabilities, reasoning, and coding skills.",
      strengths: [
        "Strong multilingual capabilities (100+ languages)",
        "Advanced reasoning and problem-solving",
        "Excellent coding capabilities",
        "Integrated into Google ecosystem",
        "Good performance on mathematical tasks",
      ],
      limitations: [
        "Limited direct access (primarily through Google products)",
        "Knowledge cutoff limitations",
        "Can produce hallucinations",
        "Less transparent than open-source alternatives",
        "Text-only in most implementations",
      ],
      useCases: [
        "Multilingual content creation",
        "Programming assistance",
        "Research and analysis",
        "Integration with Google services",
        "Educational applications",
      ],
      pricing: {
        free: "Limited access through Google products",
        paid: "Varies by product implementation",
        api: "Available through Google Cloud Vertex AI",
      },
      link: null,
    },
  ],
  image: [
    {
      name: "DALL-E 3",
      company: "OpenAI",
      releaseDate: "October 2023",
      description:
        "DALL-E 3 is OpenAI's advanced text-to-image generation model, capable of creating highly detailed and accurate images from text descriptions.",
      strengths: [
        "Excellent text understanding and adherence to prompts",
        "High-quality, detailed image generation",
        "Good handling of complex scenes and compositions",
        "Integrated with ChatGPT for prompt refinement",
        "Strong safety filters and content policies",
      ],
      limitations: [
        "Limited customization options compared to some alternatives",
        "Strict content policies restrict certain types of images",
        "No direct style control parameters",
        "Cannot generate images of specific public figures",
        "Limited animation capabilities",
      ],
      useCases: [
        "Marketing and advertising visuals",
        "Concept art and ideation",
        "Educational illustrations",
        "Content creation for blogs and social media",
        "Product visualization",
      ],
      pricing: {
        free: "Limited free generation through ChatGPT",
        paid: "Available with ChatGPT Plus ($20/month)",
        api: "API access with credit-based pricing",
      },
      link: "/guides/dalle-tutorial",
    },
    {
      name: "Midjourney",
      company: "Midjourney, Inc.",
      releaseDate: "July 2022 (v5 in March 2023)",
      description:
        "Midjourney is a text-to-image AI that creates highly artistic and stylized images. Known for its aesthetic quality and artistic output.",
      strengths: [
        "Exceptional aesthetic quality and artistic style",
        "Strong composition and lighting",
        "Extensive parameter control for customization",
        "Regular updates and improvements",
        "Active community for inspiration and learning",
      ],
      limitations: [
        "Discord-based interface (though web app in development)",
        "Steeper learning curve for advanced parameters",
        "Limited editing capabilities for generated images",
        "Subscription required for all usage",
        "Content policy restrictions",
      ],
      useCases: [
        "Artistic concept development",
        "Illustration and graphic design",
        "Marketing and advertising visuals",
        "Interior and architectural visualization",
        "Fashion and product design",
      ],
      pricing: {
        free: "No free tier",
        paid: "Subscription plans from $10-$60/month",
        api: "No public API currently available",
      },
      link: "/guides/midjourney-tutorial",
    },
    {
      name: "Stable Diffusion",
      company: "Stability AI",
      releaseDate: "August 2022 (XL in July 2023)",
      description:
        "Stable Diffusion is an open-source text-to-image model that can be run locally or through various interfaces. Known for its flexibility and customization options.",
      strengths: [
        "Open-source and highly customizable",
        "Can be run locally on consumer hardware",
        "Extensive community-created resources and models",
        "Multiple specialized versions and fine-tunes available",
        "No content policy restrictions when self-hosted",
      ],
      limitations: [
        "Requires technical knowledge for optimal results",
        "Hardware requirements for local running",
        "Quality can vary based on implementation",
        "Less consistent results than some commercial options",
        "Requires prompt engineering skills for best results",
      ],
      useCases: [
        "Custom art generation",
        "Research and experimentation",
        "Personal creative projects",
        "Fine-tuning for specific visual styles",
        "Integration into custom applications",
      ],
      pricing: {
        free: "Free for self-hosting and research",
        paid: "Various commercial implementations available",
        api: "Available through Stability AI and third parties",
      },
      link: null,
    },
    {
      name: "Firefly",
      company: "Adobe",
      releaseDate: "March 2023",
      description:
        "Adobe Firefly is a family of creative generative AI models designed specifically for commercial use, with a focus on image generation and editing within Adobe's ecosystem.",
      strengths: [
        "Commercial usage rights clearly defined",
        "Trained on licensed content and Adobe Stock",
        "Seamless integration with Adobe Creative Cloud",
        "Strong text effects and typography generation",
        "Built-in editing and refinement tools",
      ],
      limitations: [
        "Requires Adobe subscription for full access",
        "More limited stylistic range than some alternatives",
        "Primarily focused on commercial/professional use cases",
        "Less community resources compared to open alternatives",
        "Newer to market with fewer specialized features",
      ],
      useCases: [
        "Professional design workflows",
        "Commercial content creation",
        "Marketing materials with proper licensing",
        "Integration with existing Adobe projects",
        "Text and typography effects",
      ],
      pricing: {
        free: "Limited free generations",
        paid: "Included with Creative Cloud subscriptions",
        api: "Available through Adobe Developer Console",
      },
      link: null,
    },
  ],
  multimodal: [
    {
      name: "Gemini",
      company: "Google",
      releaseDate: "December 2023",
      description:
        "Gemini is Google's multimodal AI model capable of understanding and generating text, images, audio, and code. Available in different sizes (Ultra, Pro, Nano).",
      strengths: [
        "Strong multimodal capabilities across text, images, and code",
        "Advanced reasoning and problem-solving",
        "Multiple model sizes for different use cases",
        "Integration with Google ecosystem",
        "Real-time information through Google Search",
      ],
      limitations: [
        "Performance varies by model size",
        "Limited audio and video generation capabilities",
        "Some features restricted to paid tiers",
        "Less specialized for certain tasks than single-modal models",
        "Newer to market with evolving capabilities",
      ],
      useCases: [
        "Complex reasoning with multimodal inputs",
        "Programming and technical documentation",
        "Research with visual and textual components",
        "Educational content with mixed media",
        "Data analysis and visualization",
      ],
      pricing: {
        free: "Gemini Free tier available",
        paid: "Gemini Advanced ($20/month)",
        api: "Available through Google AI Studio and Vertex AI",
      },
      link: "/guides/gemini-ai-tutorial",
    },
    {
      name: "GPT-4 Vision",
      company: "OpenAI",
      releaseDate: "November 2023",
      description:
        "GPT-4 Vision (GPT-4V) extends GPT-4's capabilities to understand and analyze images alongside text, enabling visual reasoning and comprehension.",
      strengths: [
        "Strong visual understanding and analysis",
        "Detailed image descriptions and explanations",
        "Can answer questions about image content",
        "Maintains GPT-4's reasoning capabilities",
        "Good at understanding diagrams and visual information",
      ],
      limitations: [
        "Cannot generate images (text output only)",
        "Limited to static image analysis",
        "No video processing capabilities",
        "Subscription required for full access",
        "Processing limitations for multiple or large images",
      ],
      useCases: [
        "Visual content analysis",
        "Accessibility features (image descriptions)",
        "Educational content with visual components",
        "Technical documentation of visual systems",
        "Data extraction from charts and graphs",
      ],
      pricing: {
        free: "Limited access with free ChatGPT",
        paid: "Full access with ChatGPT Plus ($20/month)",
        api: "Available through OpenAI API",
      },
      link: null,
    },
    {
      name: "Claude 3 Opus",
      company: "Anthropic",
      releaseDate: "March 2024",
      description:
        "Claude 3 Opus is Anthropic's most capable multimodal AI assistant, able to understand images and text with state-of-the-art performance across benchmarks.",
      strengths: [
        "Top-tier performance on reasoning benchmarks",
        "Strong image understanding capabilities",
        "Nuanced instruction following",
        "Large context window (200K tokens)",
        "Designed with safety and helpfulness focus",
      ],
      limitations: [
        "Cannot generate images",
        "Higher latency than some alternatives",
        "Premium pricing compared to alternatives",
        "No direct function calling or plugin system",
        "No audio or video processing",
      ],
      useCases: [
        "Complex document analysis with visuals",
        "Research assistance with multimodal inputs",
        "Professional and academic writing",
        "Data analysis from visual and textual sources",
        "Detailed content creation with visual references",
      ],
      pricing: {
        free: "Limited access to Claude 3 Sonnet",
        paid: "Claude Pro subscription ($20/month)",
        api: "API access with token-based pricing (premium for Opus)",
      },
      link: null,
    },
    {
      name: "DALL-E 3 + GPT-4",
      company: "OpenAI",
      releaseDate: "October 2023",
      description:
        "The combination of DALL-E 3 and GPT-4 creates a powerful multimodal system where GPT-4 can refine prompts and DALL-E 3 can generate images based on those prompts.",
      strengths: [
        "Seamless integration between text and image generation",
        "Prompt refinement for better image results",
        "High-quality image generation",
        "Iterative improvement through conversation",
        "Strong understanding of complex concepts",
      ],
      limitations: [
        "Separate models working together rather than true multimodal",
        "Content policy restrictions on image generation",
        "Subscription required for full capabilities",
        "No video or animation generation",
        "Limited customization of image style",
      ],
      useCases: [
        "Creative content development",
        "Visual storytelling",
        "Concept visualization",
        "Educational content with illustrations",
        "Marketing and advertising content",
      ],
      pricing: {
        free: "Limited access with free ChatGPT",
        paid: "Full access with ChatGPT Plus ($20/month)",
        api: "Available through separate OpenAI APIs",
      },
      link: null,
    },
  ],
};
