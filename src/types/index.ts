export interface Question {
  id: number;
  text: string;
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
