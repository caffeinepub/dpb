export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface QuizLevel {
  levelNumber: number;
  title: string;
  questions: QuizQuestion[];
  secretLetter: string;
}
