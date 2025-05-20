export interface PromptTemplate {
  title: string;
  description: string;
  template: string;
  example: string;
  tips: string[];
}

export interface PromptTemplates {
  [key: string]: PromptTemplate[];
}

export const promptTemplates: PromptTemplates = {
  general: [
    {
      title: "Role-Based Prompting",
      description:
        "Assign a specific role to the AI to get responses from a particular perspective.",
      template: "Act as a [role] and [task].",
      example:
        "Act as a financial advisor and help me create a budget for a family of four with a monthly income of $6,000.",
      tips: [
        'Be specific about the role (e.g., "senior financial advisor with 20 years experience" rather than just "financial advisor")',
        "Include relevant qualifications or expertise in the role description",
        "Combine with other techniques for more powerful results",
      ],
    },
    {
      title: "Chain-of-Thought Prompting",
      description:
        "Guide the AI to break down complex problems into step-by-step reasoning.",
      template: "Think through this step-by-step: [problem]",
      example:
        "Think through this step-by-step: If I have 5 apples and give 2 to my friend, then buy 3 more and eat 1, how many apples do I have left?",
      tips: [
        "Works best for logical, mathematical, or reasoning tasks",
        "Explicitly ask for intermediate steps and reasoning",
        "Can be combined with role-based prompting for expert reasoning",
      ],
    },
    {
      title: "Few-Shot Prompting",
      description:
        "Provide examples of the desired input-output pairs to guide the AI's responses.",
      template:
        "I want you to respond in the following format:\nInput: [example input 1]\nOutput: [example output 1]\nInput: [example input 2]\nOutput: [example output 2]\nInput: [actual input]\nOutput:",
      example:
        "I want you to respond in the following format:\nInput: Convert 10 miles to kilometers\nOutput: 10 miles = 16.09 kilometers\nInput: Convert 25 celsius to fahrenheit\nOutput: 25°C = 77°F\nInput: Convert 5 kilograms to pounds\nOutput:",
      tips: [
        "Use 2-3 examples for best results",
        "Make sure examples clearly demonstrate the pattern you want",
        "Examples should be diverse enough to show the range of expected inputs",
      ],
    },
    {
      title: "Output Format Specification",
      description:
        "Explicitly define the format you want the AI to use in its response.",
      template: "Respond in the following format: [format details]",
      example:
        "Create a weekly meal plan. Respond in the following format:\n\n# Monday\n- Breakfast: [meal]\n- Lunch: [meal]\n- Dinner: [meal]\n\n# Tuesday\n...",
      tips: [
        "Be very specific about formatting, including headings, bullet points, etc.",
        "Use markdown formatting for structured outputs",
        "Consider including a short example of the desired format",
      ],
    },
    {
      title: "Persona-Based Prompting",
      description:
        "Ask the AI to adopt a specific persona with defined characteristics.",
      template:
        "I want you to act as [persona] with the following characteristics: [traits]. Now [task].",
      example:
        "I want you to act as a tech-savvy grandmother with the following characteristics: patient, slightly confused by modern slang, loves to explain things simply. Now explain how to create a secure password.",
      tips: [
        "Define 3-5 specific traits for the persona",
        "Include communication style preferences",
        "Consider adding background or context for the persona",
      ],
    },
  ],
  chatgpt: [
    {
      title: "ChatGPT System Message",
      description:
        "Define the AI's behavior and constraints for the entire conversation.",
      template:
        "I want you to act as [role/system]. Your task is to [specific instructions]. You must [constraints/rules].",
      example:
        "I want you to act as a Python coding tutor. Your task is to help me learn Python by explaining concepts simply and providing code examples. You must avoid writing complete solutions to my homework problems, instead guiding me to find the answers myself.",
      tips: [
        "Set clear boundaries and constraints",
        "Define the scope of knowledge or expertise",
        "Establish the tone and style of responses",
        "Include any ethical guidelines or limitations",
      ],
    },
    {
      title: "ChatGPT Code Generation",
      description: "Generate code with specific requirements and explanations.",
      template:
        "Write a [language] function that [functionality]. Include comments explaining the code and provide an example of how to use it.",
      example:
        "Write a Python function that calculates the Fibonacci sequence up to n terms. Include comments explaining the code and provide an example of how to use it.",
      tips: [
        "Specify the programming language",
        "Clearly define the functionality required",
        "Ask for comments and documentation",
        "Request examples of usage",
        "Specify any performance considerations or constraints",
      ],
    },
    {
      title: "ChatGPT Content Refinement",
      description:
        "Iteratively improve content by providing specific feedback.",
      template:
        "I'm going to give you a [content type]. Please improve it by [specific improvements]. Here's the content: [your content]",
      example:
        "I'm going to give you a product description. Please improve it by making it more engaging, adding sensory details, and highlighting key benefits. Here's the content: \"Our water bottle is made of stainless steel and keeps drinks cold for hours.\"",
      tips: [
        "Be specific about what aspects need improvement",
        "Provide clear criteria for success",
        "Consider asking for multiple versions or variations",
        "Use iterative refinement by providing feedback on each version",
      ],
    },
    {
      title: "ChatGPT Structured Analysis",
      description:
        "Get a structured analysis of a topic with specific sections.",
      template:
        "Provide a comprehensive analysis of [topic] with the following sections:\n1. [Section 1]\n2. [Section 2]\n3. [Section 3]\n...",
      example:
        "Provide a comprehensive analysis of remote work trends with the following sections:\n1. Historical context and evolution\n2. Current statistics and adoption rates\n3. Benefits for employees\n4. Benefits for employers\n5. Common challenges and solutions\n6. Future predictions",
      tips: [
        "Define 4-7 specific sections for thorough coverage",
        "Order sections logically (e.g., from general to specific)",
        "Include both factual and analytical sections",
        'Consider adding a "Key Takeaways" or "Summary" section at the end',
      ],
    },
    {
      title: "ChatGPT Temperature Control",
      description:
        "Control the creativity vs. precision of responses using temperature settings.",
      template:
        "I need [creative/precise] responses about [topic]. Please adjust your temperature to [high/low] and [task].",
      example:
        "I need creative responses about marketing slogans for a new eco-friendly water bottle. Please adjust your temperature to high and generate 10 catchy slogans that highlight sustainability.",
      tips: [
        'For creative tasks (brainstorming, content creation), request "high temperature"',
        'For factual or precise tasks (coding, analysis), request "low temperature"',
        "Be explicit about the balance of creativity vs. accuracy you need",
        "Note that this is a conceptual request as users can't directly control temperature",
      ],
    },
  ],
  gemini: [
    {
      title: "Gemini Multimodal Prompting",
      description:
        "Combine text instructions with image inputs for comprehensive analysis.",
      template: "[Text instructions for analyzing the image]\n[Image upload]",
      example:
        "Analyze this chart and explain the key trends, notable data points, and what conclusions can be drawn from it.\n[Upload image of a business chart]",
      tips: [
        "Be specific about what aspects of the image to focus on",
        "Provide context about the image before uploading it",
        "Ask for specific types of analysis (e.g., technical, creative, data-focused)",
        "Consider asking for comparisons between different elements in the image",
      ],
    },
    {
      title: "Gemini Code Analysis",
      description: "Get detailed analysis and improvements for code snippets.",
      template:
        "Review this [language] code and provide the following:\n1. Code quality analysis\n2. Potential bugs or issues\n3. Performance improvements\n4. Security considerations\n5. Refactored version\n\n```[language]\n[code]\n```",
      example:
        "Review this Python code and provide the following:\n1. Code quality analysis\n2. Potential bugs or issues\n3. Performance improvements\n4. Security considerations\n5. Refactored version\n\n```python\ndef calculate_total(items):\n  total = 0\n  for i in range(len(items)):\n    total = total + items[i]['price']\n  return total\n```",
      tips: [
        "Always include the language in the code block formatting",
        "Specify exactly what aspects of the code you want analyzed",
        "For larger codebases, focus on specific functions or sections",
        "Ask for explanations of the suggested improvements",
      ],
    },
    {
      title: "Gemini Data Analysis",
      description:
        "Analyze data and generate insights with specific requirements.",
      template:
        "I have the following data:\n```\n[data]\n```\n\nAnalyze this data and provide:\n1. [analysis requirement 1]\n2. [analysis requirement 2]\n3. [analysis requirement 3]",
      example:
        "I have the following data:\n```\nMonth,Sales,Marketing Spend\nJan,10500,2000\nFeb,12600,2200\nMar,14800,2500\nApr,13200,2300\nMay,15900,2700\n```\n\nAnalyze this data and provide:\n1. Monthly sales growth rates\n2. Marketing efficiency (sales per dollar spent)\n3. Correlation between marketing spend and sales\n4. Recommendations for optimal marketing budget",
      tips: [
        "Format data clearly in tables or CSV format",
        "Specify exactly what insights you're looking for",
        "Ask for visualizations to be described (Gemini can't generate actual charts)",
        "For complex analyses, break down into multiple specific questions",
      ],
    },
    {
      title: "Gemini Comparative Analysis",
      description:
        "Get detailed comparisons between multiple items or concepts.",
      template:
        "Compare and contrast [item 1], [item 2], and [item 3] based on the following criteria:\n1. [criterion 1]\n2. [criterion 2]\n3. [criterion 3]\n\nPresent your analysis in a structured format with clear headings.",
      example:
        "Compare and contrast React, Angular, and Vue.js based on the following criteria:\n1. Learning curve\n2. Performance\n3. Community support\n4. Job market demand\n5. Suitability for different project types\n\nPresent your analysis in a structured format with clear headings.",
      tips: [
        "Choose 3-5 specific comparison criteria",
        "Ask for both similarities and differences",
        "Request a conclusion or recommendation section",
        "Specify if you want a table format for easy comparison",
      ],
    },
    {
      title: "Gemini Step-by-Step Tutorials",
      description:
        "Generate detailed tutorials with specific formatting requirements.",
      template:
        "Create a detailed tutorial on how to [task]. Include:\n1. Prerequisites\n2. Step-by-step instructions with explanations\n3. Common mistakes and troubleshooting\n4. Advanced tips\n\nFormat each step with a clear heading, numbered steps, and code examples where relevant.",
      example:
        "Create a detailed tutorial on how to set up a React development environment from scratch. Include:\n1. Prerequisites\n2. Step-by-step instructions with explanations\n3. Common mistakes and troubleshooting\n4. Advanced tips\n\nFormat each step with a clear heading, numbered steps, and code examples where relevant.",
      tips: [
        "Be specific about the format you want (headings, numbering, etc.)",
        "Request screenshots to be described at key points",
        "Ask for both basic and advanced information",
        "Specify the target audience (beginners, intermediate, advanced)",
      ],
    },
  ],
  midjourney: [
    {
      title: "Basic Midjourney Prompt Structure",
      description:
        "The fundamental structure for effective Midjourney prompts.",
      template:
        "[Subject], [Medium], [Style], [Artist/Influence], [Additional parameters]",
      example:
        "A serene mountain lake at sunset, digital painting, fantasy style, inspired by Thomas Kinkade, highly detailed --ar 16:9 --v 5",
      tips: [
        "Start with a clear subject description",
        "Specify the medium (digital art, oil painting, photograph, etc.)",
        "Include artistic style references",
        "Add technical parameters at the end with double dashes",
        "Keep core prompts under 60 words for best results",
      ],
    },
    {
      title: "Midjourney Style Mixing",
      description: "Combine multiple artistic styles for unique results.",
      template:
        "[Subject] in the style of [Artist 1] meets [Artist 2], [Additional details]",
      example:
        "Portrait of a young woman in the style of Alphonse Mucha meets Hayao Miyazaki, art nouveau lines with anime influence, ethereal lighting, ornate details --v 5 --stylize 750",
      tips: [
        "Choose artists with distinctive and complementary styles",
        "Specify which elements to take from each style",
        "Use the stylize parameter (--stylize) to control style intensity",
        "Try combining different mediums (e.g., watercolor meets digital art)",
      ],
    },
    {
      title: "Midjourney Lighting Control",
      description: "Specify lighting conditions for dramatic effect.",
      template:
        "[Subject] with [specific lighting description], [Additional details]",
      example:
        "Ancient temple ruins with volumetric god rays streaming through broken ceiling, golden hour lighting, atmospheric dust particles, dramatic shadows --ar 16:9 --v 5",
      tips: [
        "Be specific about light source (natural, artificial, time of day)",
        "Describe light quality (harsh, soft, diffused, directional)",
        "Include atmospheric effects (fog, dust, smoke) for depth",
        "Mention shadows and their characteristics",
        "Reference photography lighting terms (Rembrandt, butterfly, split, etc.)",
      ],
    },
    {
      title: "Midjourney Material Specification",
      description: "Define specific materials for realistic textures.",
      template: "[Subject] made of [material], [Additional details]",
      example:
        "Dragon sculpture made of hammered copper with patina, intricate details, reflective surfaces, studio lighting against black background --v 5 --q 2",
      tips: [
        "Be specific about material properties (rough, smooth, reflective)",
        "Combine multiple materials for interesting contrasts",
        "Include weathering or aging effects when appropriate",
        "Use the quality parameter (--q) for more detailed textures",
        "Consider how lighting will interact with the material",
      ],
    },
    {
      title: "Midjourney Camera Settings",
      description: "Use photography terminology for specific visual effects.",
      template:
        "[Subject], [Camera type], [Lens], [Camera settings], [Additional details]",
      example:
        "Abandoned amusement park, Sony A7R IV, 16mm wide-angle lens, f/2.8, long exposure, twilight, fog, cinematic --ar 16:9 --v 5",
      tips: [
        "Specify camera brand and model for particular looks",
        "Include lens focal length (wide: 16-35mm, normal: 50mm, telephoto: 85mm+)",
        "Mention aperture settings (f/1.4 for shallow depth of field, f/16 for deep focus)",
        "Add photography techniques (long exposure, HDR, panorama)",
        "Reference film stock for specific color grading (Kodak Portra, Fuji Velvia)",
      ],
    },
  ],
  dalle: [
    {
      title: "DALL-E Basic Prompt Structure",
      description: "The fundamental structure for effective DALL-E prompts.",
      template:
        "[Detailed subject description], [Style], [Composition], [Lighting], [Additional details]",
      example:
        "A cozy reading nook in a Victorian library, warm ambient lighting from a stained glass window, leather-bound books on wooden shelves, photorealistic style, wide angle view",
      tips: [
        "Be specific and detailed about the subject",
        "Include style references (photorealistic, watercolor, etc.)",
        "Specify composition (close-up, wide angle, overhead view)",
        "Describe lighting conditions for mood",
        "Keep prompts clear and concise",
      ],
    },
    {
      title: "DALL-E Style Transfer",
      description: "Generate images in specific artistic styles.",
      template:
        "[Subject] in the style of [Artist/Art movement], [Additional details]",
      example:
        "A modern city skyline in the style of Vincent van Gogh's Starry Night, swirling sky, vibrant colors, expressive brushstrokes, nighttime scene",
      tips: [
        "Reference specific artists or art movements",
        "Include distinctive style elements (brushstrokes, color palette)",
        "Combine with specific subject details",
        "Try mixing multiple artistic influences",
        "Consider historical art periods (Renaissance, Impressionism, etc.)",
      ],
    },
    {
      title: "DALL-E Composition Control",
      description: "Control the framing and composition of generated images.",
      template:
        "[Subject], [Composition type], [Perspective], [Framing], [Additional details]",
      example:
        "A red fox in a snowy forest, rule of thirds composition, low angle perspective, shallow depth of field with background bokeh, wildlife photography style",
      tips: [
        "Use photography composition terms (rule of thirds, golden ratio)",
        "Specify camera angle (bird's eye, worm's eye, eye level)",
        "Include framing elements (through branches, doorway, etc.)",
        "Mention depth of field (shallow for subject focus, deep for landscapes)",
        "Reference focal length effects (wide angle distortion, telephoto compression)",
      ],
    },
    {
      title: "DALL-E Mood and Atmosphere",
      description: "Create specific emotional tones in generated images.",
      template:
        "[Subject] with [mood/atmosphere], [Supporting elements], [Lighting], [Color palette]",
      example:
        "A solitary lighthouse on a rocky coast with melancholic atmosphere, stormy clouds, dramatic twilight lighting, muted blue and gray color palette",
      tips: [
        "Use explicit mood descriptors (joyful, mysterious, tense)",
        "Include atmospheric elements (fog, rain, sunshine)",
        "Specify time of day for mood enhancement",
        "Describe color palette that supports the mood",
        "Add environmental details that reinforce the emotion",
      ],
    },
    {
      title: "DALL-E Technical Style Specification",
      description:
        "Generate images with specific technical or medium characteristics.",
      template:
        "[Subject] as a [technical medium], [Technical details], [Additional style elements]",
      example:
        "A hummingbird drinking from a flower as a detailed pencil drawing, fine cross-hatching technique, high contrast, white background, scientific illustration style",
      tips: [
        "Specify exact medium (pencil drawing, oil painting, 3D render)",
        "Include technical details of the medium (cross-hatching, impasto)",
        "Reference illustration styles (scientific, architectural, fashion)",
        "Mention paper or background type",
        "Consider adding era-specific technical limitations",
      ],
    },
  ],
};
