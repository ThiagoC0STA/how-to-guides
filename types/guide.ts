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

export interface Module {
  title: string;
  locked: boolean;
  content: {
    sections: Section[];
  };
  questions: Question[];
}

export interface Guide {
  id: string;
  title: string;
  description: string;
  image: string | File;
  modules: Module[];
  metadata: {
    categories: string[];
    keywords: string[];
    overview: {
      text: string;
      bullets: string[];
    };
  };
}
