export interface Section {
  heading: string;
  text: string | string[];
  list: string[];
  expandable?: boolean;
}

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Category {
  id: string;
  title: string;
  color?: string;
}

export interface Module {
  title: string;
  locked: boolean;
  content: {
    sections: Section[];
  };
  questions: Question[];
}

export interface Guide {
  id?: string;
  title: string;
  description: string;
  image: string | File;
  color: string;
  is_popular: boolean;
  showColorPicker?: boolean;
  modules: Module[];
  categories: Category[];
  created_at?: string;
  metadata: {
    keywords: string[];
    overview: {
      text: string;
      bullets: string[];
    };
  };
}

export interface Model {
  id?: number;
  name: string;
  company: string;
  description: string;
  strengths: string[];
  limitations: string[];
  use_cases: string[];
  pricing: {
    free: string;
    paid: string;
    api: string;
  };
  link: string;
}
