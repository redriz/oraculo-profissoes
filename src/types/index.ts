export interface Question {
  id: number;
  text: string;
}

export interface Course {
  id: number;
  name: string;
  description: string;
  habilitation12: boolean;
  url: string;
  image: string;
  profileType: number;
}

export interface ProfileType {
  id: number;
  name: string;
  relatedAnswersYes: number[];
  relatedAnswersNo?: number[];
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
