export const GUIDES = [
  {
    id: "chatgpt",
    title: "How to Use ChatGPT: Complete 2025 Guide",
    description: "Master ChatGPT from scratch with our step-by-step tutorial",
    schemaFile: "chatgpt-guide",
    category: ["chatgpt", "text-generation"],
    featured: true,
    image: "/images/logos/chatgpt-logo.png",
    color: "#74aa9c",
    lastUpdated: "2025-04-19",
    updateNotes: "Updated with GPT-4o information",
    modules: [
      {
        title: "Introduction",
        locked: false,
        content: {
          sections: [
            {
              heading: "What is ChatGPT?",
              text: "ChatGPT is an AI language model developed by OpenAI that can understand and generate human-like text based on the prompts you give it. It's designed to have conversations, answer questions, write content, and assist with various tasks.",
            },
            {
              heading: "Why learn ChatGPT in 2025?",
              text: "In 2025, ChatGPT has become an essential productivity tool used by millions of people worldwide. Learning to use ChatGPT effectively can help you:",
              list: [
                "Save time on research and content creation",
                "Get help with coding and technical problems",
                "Learn new concepts through interactive explanations",
                "Brainstorm ideas for creative projects",
                "Automate repetitive writing tasks",
              ],
            },
            {
              heading: "ChatGPT vs. Other AI Tools",
              expandable: true,
              text: "While there are many AI tools available in 2025, ChatGPT remains one of the most versatile and user-friendly options. Compared to alternatives like Gemini AI, Claude, or specialized AI tools, ChatGPT offers:",
              list: [
                "A more intuitive interface for beginners",
                "Strong capabilities across a wide range of tasks",
                "Regular updates and improvements",
                "A large community of users sharing tips and techniques",
              ],
            },
            {
              heading: "What you'll learn in this guide",
              text: "This comprehensive guide will take you from complete beginner to confident ChatGPT user. We'll cover everything from creating your account to advanced techniques for getting the best results.",
            },
          ],
        },
        questions: [
          {
            question: "What is the primary purpose of ChatGPT?",
            options: [
              "To create images and visual content",
              "To understand and generate human-like text",
              "To analyze data and create spreadsheets",
              "To edit and enhance videos",
            ],
            correctAnswer: 1,
          },
        ],
      },
      {
        title: "Creating Your ChatGPT Account",
        locked: false,
        content: {
          sections: [
            {
              heading: "Signing up for ChatGPT",
              text: "Creating a ChatGPT account is straightforward. Follow these steps to get started:",
              list: [
                "Visit chat.openai.com",
                "Click on 'Sign up' in the top-right corner",
                "Choose your preferred signup method (email, Google, Microsoft, or Apple account)",
                "Follow the prompts to create your account",
                "Verify your email address if required",
              ],
            },
            {
              heading: "Free vs. Paid Options",
              text: "In 2025, ChatGPT offers several subscription tiers:",
            },
            {
              heading: "ChatGPT Free",
              expandable: true,
              text: "The free version of ChatGPT includes:",
              list: [
                "Access to GPT-3.5 model",
                "Standard response speed",
                "Basic features and capabilities",
                "Limited usage during high-demand periods",
              ],
              note: "Perfect for casual users and beginners.",
            },
            {
              heading: "ChatGPT Plus ($20/month)",
              expandable: true,
              text: "The Plus subscription includes:",
              list: [
                "Access to GPT-4o model",
                "Faster response times",
                "Priority access during high-demand periods",
                "Access to plugins and advanced features",
                "Higher usage limits",
              ],
              note: "Recommended for regular users who need more capabilities.",
            },
            {
              heading: "ChatGPT Team ($30/user/month)",
              expandable: true,
              text: "The Team subscription includes:",
              list: [
                "All Plus features",
                "Collaborative workspaces",
                "Shared chat history with team members",
                "Admin controls and user management",
                "Enhanced security features",
              ],
              note: "Ideal for small teams and businesses.",
            },
          ],
        },
        questions: [
          {
            question: "Which ChatGPT subscription gives you access to GPT-4o?",
            options: [
              "ChatGPT Free",
              "ChatGPT Plus",
              "ChatGPT Team",
              "All subscriptions",
            ],
            correctAnswer: 1,
          },
        ],
      },
      {
        title: "Navigating the ChatGPT Interface",
        locked: false,
        content: {
          sections: [
            {
              heading: "Understanding the Main Dashboard",
              text: "When you first log in to ChatGPT, you'll see the main dashboard with several key components:",
              list: [
                "Chat Area: The central part of the screen where your conversations appear",
                "Message Input Box: At the bottom, where you type your prompts",
                "New Chat Button: In the top-left corner, used to start a new conversation",
                "Model Selector: Located above the message input box, allows you to choose which ChatGPT model to use",
                "Conversation History: Listed in the left sidebar, showing your previous chats",
              ],
            },
            {
              heading: "Interface Accessibility Tips",
              expandable: true,
              text: "ChatGPT offers several accessibility features:",
              list: [
                "Keyboard shortcuts: Press '/' to focus on the message input box",
                "Dark mode: Toggle in settings for reduced eye strain",
                "Text size adjustment: Change in your browser settings (Ctrl/Cmd +/-)",
                "Screen reader compatibility: Works with most screen readers",
              ],
            },
            {
              heading: "Starting a New Conversation",
              text: "To begin a new chat:",
              list: [
                "Click the 'New chat' button in the top-left corner of the screen",
                "The chat area will clear, and you'll see a welcome message",
                "Type your question or prompt in the message input box at the bottom",
                "Press Enter or click the send button (paper airplane icon) to submit your prompt",
              ],
            },
          ],
        },
        questions: [
          {
            question:
              "Where is the model selector located in the ChatGPT interface?",
            options: [
              "In the left sidebar",
              "Above the message input box",
              "In the settings menu",
              "Top-right corner of the screen",
            ],
            correctAnswer: 1,
          },
        ],
      },
      {
        title: "Writing Your First Prompts",
        locked: true,
        content: {
          sections: [
            {
              heading: "What is a Prompt?",
              text: "A prompt is any instruction, question, or statement you give to ChatGPT. The quality of your prompt directly affects the quality of the response.",
            },
            {
              heading: "Tips for Writing Effective Prompts",
              expandable: true,
              text: "Follow these tips to get better results:",
              list: [
                "Be specific about what you want",
                "Provide context if needed",
                "Break complex tasks into steps",
                "Use examples to clarify your request",
                "Ask follow-up questions to refine answers",
              ],
            },
            {
              heading: "Prompt Examples",
              text: "Here are some example prompts:",
              list: [
                "Summarize this article: [paste text]",
                "Write a professional email to a client about a delayed project",
                "Explain quantum computing in simple terms",
                "Generate 5 creative blog post ideas about AI",
              ],
            },
          ],
        },
        questions: [
          {
            question:
              "Which of the following is a good practice when writing prompts for ChatGPT?",
            options: [
              "Be vague to see what happens",
              "Be specific and provide context",
              "Use only one-word prompts",
              "Avoid giving examples",
            ],
            correctAnswer: 1,
          },
        ],
      },
      {
        title: "Understanding Different ChatGPT Models",
        locked: true,
        content: {
          sections: [
            {
              heading: "Overview of Available Models",
              text: "ChatGPT offers several models, each with different capabilities and access levels.",
            },
            {
              heading: "Differences Between GPT-3.5, GPT-4o, and Others",
              expandable: true,
              text: "Key differences between models:",
              list: [
                "GPT-3.5: Fast, good for general tasks, available for free",
                "GPT-4o: More accurate, better at complex reasoning, available to Plus/Team users",
                "Other models: May be available for specific use cases or in the API",
              ],
            },
            {
              heading: "When to Use Each Model",
              text: "Use GPT-3.5 for everyday tasks and quick answers. Use GPT-4o for more complex, nuanced, or important tasks where accuracy matters.",
            },
          ],
        },
        questions: [
          {
            question:
              "Which model provides access to advanced features and higher accuracy?",
            options: [
              "GPT-3.5",
              "GPT-4o",
              "Both are the same",
              "None of the above",
            ],
            correctAnswer: 1,
          },
        ],
      },
      {
        title: "Practical Applications",
        locked: true,
        content: {
          sections: [
            {
              heading: "Everyday Uses for ChatGPT",
              text: "ChatGPT can help with a variety of daily tasks:",
              list: [
                "Drafting emails and messages",
                "Summarizing articles or documents",
                "Generating ideas for projects or content",
                "Learning new concepts quickly",
                "Getting help with homework or research",
              ],
            },
            {
              heading: "Using ChatGPT for Work and Study",
              expandable: true,
              text: "Ways to use ChatGPT professionally or academically:",
              list: [
                "Automate repetitive writing tasks",
                "Brainstorm solutions to problems",
                "Create outlines for reports or presentations",
                "Translate or rephrase text",
                "Practice interview questions",
              ],
            },
            {
              heading: "Creative Applications",
              text: "ChatGPT can also be used for creative tasks:",
              list: [
                "Write stories, poems, or scripts",
                "Generate character ideas for games or books",
                "Compose song lyrics",
                "Invent new recipes",
              ],
            },
          ],
        },
        questions: [
          {
            question:
              "Which of the following is NOT a common practical use of ChatGPT?",
            options: [
              "Writing a poem",
              "Generating code snippets",
              "Making a phone call",
              "Summarizing a document",
            ],
            correctAnswer: 2,
          },
        ],
      },
      {
        title: "Troubleshooting Common Issues",
        locked: true,
        content: {
          sections: [
            {
              heading: "Common Problems and Solutions",
              text: "Some common issues and how to solve them:",
              list: [
                "Slow or no response: Refresh the page or check your internet connection",
                "Model not available: Try again later or switch models",
                "Unexpected output: Rephrase your prompt or provide more context",
              ],
            },
            {
              heading: "What to Do if ChatGPT is Down",
              expandable: true,
              text: "If ChatGPT is not working:",
              list: [
                "Check OpenAI's status page for outages",
                "Try logging out and back in",
                "Clear your browser cache",
                "Wait a few minutes and try again",
              ],
            },
            {
              heading: "Improving Response Quality",
              text: "Tips to get better answers:",
              list: [
                "Be clear and specific in your prompts",
                "Use follow-up questions to clarify",
                "Provide examples or context when possible",
              ],
            },
          ],
        },
        questions: [
          {
            question: "What should you try first if ChatGPT is not responding?",
            options: [
              "Restart your computer",
              "Refresh the page or check your internet connection",
              "Contact support immediately",
              "Switch to another AI tool",
            ],
            correctAnswer: 1,
          },
        ],
      },
      {
        title: "Frequently Asked Questions",
        locked: true,
        content: {
          sections: [
            {
              heading: "General FAQs",
              text: "Common questions about ChatGPT:",
              list: [
                "Is ChatGPT free to use? (Yes, with limitations)",
                "Can I use ChatGPT on mobile? (Yes, via browser or app)",
                "Does ChatGPT support multiple languages? (Yes, many languages)",
              ],
            },
            {
              heading: "Account & Privacy",
              expandable: true,
              text: "Questions about your account and privacy:",
              list: [
                "Is my data safe with ChatGPT? (OpenAI takes privacy seriously)",
                "Can I delete my chat history? (Yes, in settings)",
                "Does ChatGPT store my conversations? (Some data may be used to improve the service)",
              ],
            },
            {
              heading: "Model & Feature Questions",
              text: "Questions about models and features:",
              list: [
                "How do I switch models? (Use the model selector above the input box)",
                "What is the difference between GPT-3.5 and GPT-4o? (Accuracy, speed, and features)",
                "Can I use plugins? (Yes, with Plus/Team subscriptions)",
              ],
            },
          ],
        },
        questions: [
          {
            question: "Can ChatGPT access users' personal information?",
            options: [
              "Yes, always",
              "No, it cannot access personal information",
              "Only with permission",
              "Only for paid users",
            ],
            correctAnswer: 1,
          },
        ],
      },
    ],
  },
  {
    id: "chatgptLongerResponses",
    title: "How to Make ChatGPT Write Longer Responses: Complete 2025 Guide",
    description:
      "Learn techniques to get more detailed and comprehensive responses from ChatGPT",
    schemaFile: "chatgpt-longer-responses-guide",
    category: ["chatgpt", "text-generation"],
    featured: false,
    image: "/images/logos/chatgpt-logo.png",
    color: "#74aa9c",
    lastUpdated: "today", // Replace with actual date if needed
    updateNotes: "Initial version published",
  },
  {
    id: "dalle",
    title: "How to Use DALL-E: Complete 2025 Tutorial",
    description:
      "Learn how to create amazing AI-generated images with OpenAI's DALL-E",
    schemaFile: "dalle-guide",
    category: ["dalle", "image-generation"],
    featured: true,
    image: "/images/logos/dalle-logo.png",
    color: "#e74c3c",
    lastUpdated: "today", // Replace with actual date if needed
    updateNotes: "Initial version published",
  },
  {
    id: "midjourney",
    title: "How to Use Midjourney: Step-by-Step Guide",
    description:
      "Learn how to create stunning AI-generated images with Midjourney",
    schemaFile: "midjourney-guide",
    category: ["midjourney", "image-generation"],
    featured: true,
    image: "/images/logos/midjourney-logo.png",
    color: "#3498db",
    lastUpdated: "2025-03-28",
    updateNotes: "Updated with v6 features",
  },
  {
    id: "gemini",
    title: "How to Use Gemini AI: Complete 2025 Guide",
    description:
      "Master Google's powerful multimodal AI assistant with our comprehensive guide",
    schemaFile: "gemini-guide",
    category: ["gemini", "multimodal-ai"],
    featured: true,
    image: "/images/logos/gemini-logo.png",
    color: "#8e44ad",
    lastUpdated: "2025-04-10",
    updateNotes: "Updated with v6 features",
  },
  {
    id: "aiContentCreation",
    title: "How to Use AI for Content Creation: Complete 2025 Guide",
    description:
      "Master AI-powered content creation to produce high-quality blogs, social media, videos, and more",
    schemaFile: "ai-content-creation-guide",
    category: ["content-creation", "productivity"],
    featured: false,
    image: "/images/logos/content-creation-logo.png",
    color: "#2ecc71",
    lastUpdated: "today", // Replace with actual date if needed
    updateNotes: "Initial version published",
  },
  {
    id: "aiPrompts",
    title: "How to Write Effective AI Prompts: Complete 2025 Guide",
    description:
      "Techniques for crafting prompts that get better results from AI tools",
    schemaFile: "ai-prompts-guide",
    category: ["prompt-engineering", "productivity"],
    featured: false,
    image: "/images/logos/content-creation-logo.png", // Consider a dedicated prompt engineering logo
    color: "#2ecc71",
    lastUpdated: "today", // Replace with actual date if needed
    updateNotes: "Initial version published",
  },
];
