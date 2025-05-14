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
    metadata: {
      title: "How to Use ChatGPT: Complete 2025 Guide",
      description:
        "Master ChatGPT from scratch with our step-by-step tutorial. Learn how to use ChatGPT for productivity, content creation, coding, and more in 2025.",
      keywords: [
        "ChatGPT guide",
        "How to use ChatGPT",
        "ChatGPT tutorial 2025",
        "OpenAI ChatGPT",
        "AI productivity tools",
        "ChatGPT for beginners",
        "ChatGPT tips",
        "ChatGPT modules",
        "ChatGPT course",
        "GPT-4o guide",
      ],
      openGraph: {
        title: "How to Use ChatGPT: Complete 2025 Guide",
        description:
          "Master ChatGPT from scratch with our step-by-step tutorial. Learn how to use ChatGPT for productivity, content creation, coding, and more in 2025.",
        url: "https://how-to-guides-gamma.vercel.app/guides/chatgpt",
        type: "article",
        images: [
          {
            url: "/images/logos/chatgpt-logo.png",
            width: 1200,
            height: 630,
            alt: "ChatGPT Logo",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "How to Use ChatGPT: Complete 2025 Guide",
        description:
          "Master ChatGPT from scratch with our step-by-step tutorial. Learn how to use ChatGPT for productivity, content creation, coding, and more in 2025.",
        images: ["/images/logos/chatgpt-logo.png"],
      },
    },
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
    featured: true,
    image: "/images/logos/chatgpt-logo.png",
    color: "#74aa9c",
    lastUpdated: "today",
    updateNotes: "Initial version published",
    metadata: {
      title: "How to Make ChatGPT Write Longer Responses: Complete 2025 Guide",
      description:
        "Learn proven techniques to get more detailed and comprehensive responses from ChatGPT. Step-by-step strategies for maximizing output length in 2025.",
      keywords: [
        "ChatGPT longer responses",
        "How to make ChatGPT write more",
        "ChatGPT detailed answers",
        "ChatGPT prompt engineering",
        "ChatGPT tips 2025",
        "AI writing guide",
        "ChatGPT content creation",
        "GPT-4o long responses",
        "ChatGPT Plus tips",
        "OpenAI ChatGPT guide",
      ],
      openGraph: {
        title:
          "How to Make ChatGPT Write Longer Responses: Complete 2025 Guide",
        description:
          "Learn proven techniques to get more detailed and comprehensive responses from ChatGPT. Step-by-step strategies for maximizing output length in 2025.",
        url: "https://how-to-guides-gamma.vercel.app/guides/chatgptLongerResponses",
        type: "article",
        images: [
          {
            url: "/images/logos/chatgpt-logo.png",
            width: 1200,
            height: 630,
            alt: "ChatGPT Logo",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title:
          "How to Make ChatGPT Write Longer Responses: Complete 2025 Guide",
        description:
          "Learn proven techniques to get more detailed and comprehensive responses from ChatGPT. Step-by-step strategies for maximizing output length in 2025.",
        images: ["/images/logos/chatgpt-logo.png"],
      },
    },
    modules: [
      {
        title: "Introduction",
        locked: false,
        content: {
          sections: [
            {
              heading: "The Challenge of Limited AI Responses",
              text: [
                "ChatGPT has revolutionized how we interact with artificial intelligence, providing impressive responses to a wide range of queries. However, many users encounter a common frustration: responses that are too brief, lacking the depth and detail needed for comprehensive understanding or practical application.",
                "Whether you're using ChatGPT for content creation, research, learning complex topics, or developing detailed plans, the default tendency toward brevity can be limiting. The good news is that with the right techniques, you can consistently get ChatGPT to provide longer, more detailed, and more valuable responses.",
                "In this comprehensive guide, you'll learn proven methods to make ChatGPT write longer responses. We'll cover everything from understanding why ChatGPT sometimes cuts responses short to implementing advanced techniques that encourage verbosity and depth. These strategies work across different versions of ChatGPT, including both free and Plus subscriptions.",
              ],
            },
            {
              heading: "Why Longer Responses Matter",
              text: [
                "Before diving into specific techniques, let's consider why you might want longer responses from ChatGPT:",
                "• Greater Depth: Longer responses typically contain more nuanced explanations and cover more aspects of a topic",
                "• Reduced Back-and-Forth: Getting comprehensive information in one response saves time compared to multiple follow-up questions",
                "• Better Context: Extended responses provide more context and connections between ideas",
                "• More Examples: Longer content usually includes more examples and illustrations of concepts",
                "• Practical Detail: For how-to content, longer responses typically include more actionable steps and considerations",
                "• Content Creation: When using ChatGPT for content creation, longer outputs provide more material to work with",
              ],
            },
            {
              heading: "The Evolution of ChatGPT's Response Behavior",
              expandable: true,
              text: `ChatGPT's response behavior has evolved significantly since its initial release. Early versions (GPT-3.5) were more prone to brevity and often required extensive prompting to generate detailed responses. With GPT-4, OpenAI improved the model's ability to provide more comprehensive answers, though it still maintained a tendency toward conciseness in many scenarios.

The latest GPT-4o model (as of 2025) offers improved verbosity and detail, particularly for complex topics, but still requires specific prompting techniques to consistently generate very long responses. OpenAI has continually balanced the trade-off between helpful conciseness and comprehensive detail, generally favoring brevity by default while allowing users to request more extensive information when needed.

Understanding this evolution helps explain why specific prompting techniques are necessary to override the default behavior and encourage longer, more detailed outputs.`,
            },
            {
              heading: "What You'll Learn in This Guide",
              text: `By the end of this comprehensive guide, you will:
1. Understand the factors that influence ChatGPT's response length
2. Master explicit techniques for requesting longer, more detailed content
3. Learn how to effectively continue responses when ChatGPT stops
4. Discover how to break down complex topics to generate comprehensive coverage
5. Implement structural frameworks that naturally encourage verbosity
6. Use role-based prompting to influence response length and detail
7. Optimize your approach for different versions of ChatGPT
8. Build a toolkit of prompts and techniques for consistently getting detailed responses`,
            },
          ],
        },
        questions: [
          {
            question: "Why might you want longer responses from ChatGPT?",
            options: [
              "To use more of your token quota",
              "To get greater depth and more nuanced explanations",
              "To confuse the AI model",
              "To test the limits of the system",
            ],
            correctAnswer: 1,
          },
        ],
      },
      {
        title: "Understanding Response Limitations",
        locked: false,
        content: {
          sections: [
            {
              heading: "Why ChatGPT Sometimes Gives Short Responses",
              text: `To effectively get longer responses from ChatGPT, it's important to understand why the AI sometimes provides brief answers in the first place. Several factors influence response length:`,
            },
            {
              heading: "Default Behavior and Training",
              expandable: true,
              text: `ChatGPT is trained to be helpful, which often means being concise and direct. The model tries to answer questions efficiently without unnecessary verbosity, similar to how a helpful human might respond. This training creates a default tendency toward brevity unless specifically instructed otherwise.

Additionally, ChatGPT is trained on a diverse range of internet text, including many examples of concise answers to questions. This training data influences the model to sometimes emulate this concise style, particularly for straightforward questions.`,
            },
            {
              heading: "Token Limits and Context Windows",
              expandable: true,
              text: `ChatGPT operates within specific technical constraints:

- Token Limits: Each response is limited by a maximum number of tokens (roughly 3/4 of a word in English). As of 2025, these limits vary by model version:
  - GPT-3.5: Approximately 4,000 tokens per response
  - GPT-4: Approximately 4,000-8,000 tokens per response
  - GPT-4o: Approximately 4,000-8,000 tokens per response

- Context Window: The total conversation (your prompts plus ChatGPT's responses) must fit within the model's context window:
  - GPT-3.5: 16,000 tokens
  - GPT-4: 32,000 tokens
  - GPT-4o: 128,000 tokens

When approaching these limits, ChatGPT may cut responses short or become more concise to avoid hitting the boundary.`,
            },
            {
              heading: "Prompt Interpretation",
              expandable: true,
              text: `How ChatGPT interprets your prompt significantly affects response length:

- Question Type: Simple, factual questions ("What is the capital of France?") naturally elicit brief responses
- Perceived Audience Needs: ChatGPT tries to gauge how much detail you need based on your prompt
- Implicit Expectations: Without specific instructions about length or detail, ChatGPT makes assumptions about appropriate response length
- Prompt Specificity: Vague prompts often receive shorter responses than detailed, specific requests`,
            },
            {
              heading: "Response Completion Perception",
              expandable: true,
              text: `ChatGPT has an internal mechanism for determining when a response is "complete." This can lead to responses being cut off when:

- The model believes it has fully answered your question
- It reaches a natural conclusion point in its generation
- It has provided what it considers a sufficient level of detail
- It has completed the format it determined was appropriate (e.g., a list, a paragraph, etc.)

This completion perception varies based on the prompt and context, sometimes resulting in responses that feel incomplete to users seeking more depth.`,
            },
            {
              heading: "Version and Subscription Differences",
              expandable: true,
              text: `Different versions of ChatGPT have different tendencies regarding response length:

- GPT-3.5 (Free Tier): Generally provides shorter responses and has stricter limits
- GPT-4 (Plus Subscription): Capable of more detailed responses and better at following explicit length instructions
- GPT-4o (Plus Subscription): Offers improved verbosity and detail, particularly for complex topics

Free tier users typically face more significant challenges in getting very long responses compared to Plus subscribers.`,
            },
            {
              heading: "Implications for Getting Longer Responses",
              text: `Understanding these factors reveals several key insights for encouraging longer responses:

- You need to explicitly override ChatGPT's default tendency toward brevity
- Your prompts must clearly signal that you want detailed, comprehensive information
- You should structure requests in ways that naturally encourage longer responses
- For very long content, you'll need techniques to work around token limits
- Different approaches may be needed for different versions of ChatGPT

In the following sections, we'll explore specific techniques that address these insights, providing you with a comprehensive toolkit for consistently getting longer, more detailed responses from ChatGPT.`,
            },
          ],
        },
        questions: [
          {
            question:
              "Which of the following is a key factor that influences ChatGPT's response length?",
            options: [
              "The time of day when you're using ChatGPT",
              "The user's typing speed",
              "Token limits and context windows",
              "The browser you're using",
            ],
            correctAnswer: 2,
          },
        ],
      },
    ],
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
