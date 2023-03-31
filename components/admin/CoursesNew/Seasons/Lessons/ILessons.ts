export interface ILesson {
  title: string;
  number: number;
  about: string;
  link: string;
  points: number;
  banner: string;
  objectives: string;
  duration: number;
  quiz: boolean;
  homework: boolean;
  seasons_id: number;
  quizzes: [IQuiz];
  lesson_homeworks: [ILessonHomeWorks];
}
export interface IQuiz {
  title: string;
  passing_grade: number;
  points: number;
  questions: [IQuestion];
}
export interface ILessonHomeWorks {
  title: string;
  about: string;
}
export interface IQuestion {
  question: string;
  answers: [IAnswer];
}
export interface IAnswer {
  answer: string;
  status: boolean;
}
