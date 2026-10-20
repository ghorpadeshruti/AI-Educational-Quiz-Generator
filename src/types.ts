export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizData {
  title: string;
  summary: string;
  questions: QuizQuestion[];
  topic: string;
  studyMaterial?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface SampleStudyMaterial {
  id: string;
  category: string;
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  material: string;
}
