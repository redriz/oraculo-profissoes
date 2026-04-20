export interface Question {
  id: number;
  text: string;
}

export interface Course {
  id: number;
  name: string;
  description: string;
  url: string;
  image: string;
  relatedQuestions: number[];
}

export interface QuizAnswers {
  [key: number]: boolean | null;
}

export interface QuizState {
  answers: QuizAnswers;
  completed: boolean;
}

export interface LastResult {
  answers: QuizAnswers;
  completedAt: number;
}
