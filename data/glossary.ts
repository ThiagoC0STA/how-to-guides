export interface GlossaryTerm {
  term: string;
  definition: string;
  category: "general" | "technical" | "models" | "ethical";
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "AI (Artificial Intelligence)",
    definition:
      "The simulation of human intelligence processes by machines, especially computer systems. These processes include learning, reasoning, and self-correction.",
    category: "general",
  },
  {
    term: "AGI (Artificial General Intelligence)",
    definition:
      "A hypothetical type of AI that would have the ability to understand, learn, and apply knowledge across a wide range of tasks at a level equal to or greater than humans.",
    category: "general",
  },
  {
    term: "Algorithm",
    definition:
      "A set of rules or instructions given to an AI, neural network, or other machine to help it learn on its own. In the context of AI, algorithms are the foundation for how machines process data and make decisions.",
    category: "general",
  },
  {
    term: "API (Application Programming Interface)",
    definition:
      "A set of rules and protocols that allows different software applications to communicate with each other. In AI contexts, APIs enable developers to integrate AI capabilities into their applications.",
    category: "technical",
  },
  {
    term: "Bias (AI Bias)",
    definition:
      "Systematic errors in AI systems that can lead to unfair outcomes, often reflecting human biases present in training data or algorithm design.",
    category: "ethical",
  },
  {
    term: "ChatGPT",
    definition:
      "A conversational AI model developed by OpenAI based on the GPT architecture. It's designed to engage in dialogue and provide human-like responses to text prompts.",
    category: "models",
  },
  {
    term: "Computer Vision",
    definition:
      "A field of AI that enables computers to derive meaningful information from digital images, videos, and other visual inputs, and take actions or make recommendations based on that information.",
    category: "technical",
  },
  {
    term: "DALL-E",
    definition:
      "An AI system developed by OpenAI that can create realistic images and art from natural language descriptions (prompts).",
    category: "models",
  },
  {
    term: "Deep Learning",
    definition:
      "A subset of machine learning based on artificial neural networks with multiple layers. Deep learning drives many AI advancements, particularly in areas like computer vision and natural language processing.",
    category: "technical",
  },
  {
    term: "Embeddings",
    definition:
      "Numerical representations of data (like text, images, or audio) that capture semantic meaning in a way that machines can process. Embeddings help AI systems understand relationships between different pieces of content.",
    category: "technical",
  },
  {
    term: "Fine-tuning",
    definition:
      "The process of taking a pre-trained AI model and further training it on a specific dataset to adapt it for a particular task or domain.",
    category: "technical",
  },
  {
    term: "Gemini AI",
    definition:
      "A multimodal AI model developed by Google that can process and generate content across different formats including text, images, audio, and video.",
    category: "models",
  },
  {
    term: "Generative AI",
    definition:
      "AI systems that can create new content, including text, images, audio, and video, based on patterns learned from training data.",
    category: "general",
  },
  {
    term: "GPT (Generative Pre-trained Transformer)",
    definition:
      "A type of large language model architecture developed by OpenAI that uses transformer neural networks to generate human-like text based on the input it receives.",
    category: "technical",
  },
  {
    term: "Hallucination (AI Hallucination)",
    definition:
      "When an AI generates information that is factually incorrect or completely fabricated, despite appearing plausible. This occurs when the model produces content not supported by its training data or input context.",
    category: "technical",
  },
  {
    term: "Large Language Model (LLM)",
    definition:
      "A type of AI model trained on vast amounts of text data that can understand, generate, and manipulate human language. Examples include GPT-4, Claude, and Gemini.",
    category: "technical",
  },
  {
    term: "Machine Learning",
    definition:
      "A subset of AI that enables systems to learn and improve from experience without being explicitly programmed. It focuses on developing algorithms that can access data and use it to learn for themselves.",
    category: "technical",
  },
  {
    term: "Midjourney",
    definition:
      "An AI image generation tool that creates images based on text prompts using a combination of deep learning techniques.",
    category: "models",
  },
  {
    term: "Multimodal AI",
    definition:
      "AI systems that can process and generate multiple types of information (text, images, audio, video) simultaneously, allowing for more comprehensive understanding and creation capabilities.",
    category: "technical",
  },
  {
    term: "Natural Language Processing (NLP)",
    definition:
      "A branch of AI focused on enabling computers to understand, interpret, and generate human language in a way that is both meaningful and useful.",
    category: "technical",
  },
  {
    term: "Neural Network",
    definition:
      "A computing system inspired by the structure of the human brain. Neural networks consist of interconnected nodes (neurons) that process information and learn patterns from data.",
    category: "technical",
  },
  {
    term: "Parameters",
    definition:
      "The internal variables of an AI model that are adjusted during training. The number of parameters often indicates the model's complexity and capacity to learn.",
    category: "technical",
  },
  {
    term: "Prompt",
    definition:
      "An input (usually text) given to an AI system to elicit a specific response or output. Effective prompting is crucial for getting desired results from AI models.",
    category: "general",
  },
  {
    term: "Prompt Engineering",
    definition:
      "The practice of designing and refining inputs to AI systems to achieve desired outputs. This involves understanding how to communicate effectively with AI models through carefully crafted instructions.",
    category: "general",
  },
  {
    term: "Reinforcement Learning",
    definition:
      "A type of machine learning where an agent learns to make decisions by taking actions in an environment to maximize some notion of cumulative reward.",
    category: "technical",
  },
  {
    term: "Supervised Learning",
    definition:
      "A type of machine learning where the algorithm is trained on labeled data, learning to map inputs to known outputs.",
    category: "technical",
  },
  {
    term: "Temperature (in AI)",
    definition:
      "A parameter that controls the randomness or creativity of AI-generated outputs. Higher temperature values produce more diverse and unpredictable results, while lower values make outputs more deterministic and focused.",
    category: "technical",
  },
  {
    term: "Token",
    definition:
      "The basic unit of text that language models process. Tokens can be words, parts of words, or individual characters, depending on the model's tokenization method.",
    category: "technical",
  },
  {
    term: "Training Data",
    definition:
      "The dataset used to teach an AI model patterns, relationships, and how to perform specific tasks. The quality and diversity of training data significantly impact an AI system's performance and potential biases.",
    category: "technical",
  },
  {
    term: "Transformer",
    definition:
      "A type of neural network architecture that uses self-attention mechanisms to process sequential data. Transformers are the foundation of many modern language models like GPT and BERT.",
    category: "technical",
  },
  {
    term: "Unsupervised Learning",
    definition:
      "A type of machine learning where the algorithm learns patterns from unlabeled data without explicit guidance on what to look for.",
    category: "technical",
  },
];

export const categories = [
  { id: "all", name: "All Terms" },
  { id: "general", name: "General AI" },
  { id: "technical", name: "Technical" },
  { id: "models", name: "AI Models" },
  { id: "ethical", name: "Ethics & Bias" },
];
