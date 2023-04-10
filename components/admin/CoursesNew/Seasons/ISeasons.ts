export interface ISeason {
  name: string;
  season: number;
  id: number;
  lessons: [ILesson];
}
export interface ILesson {
  title: string;
  about: string;
  duration: number;
  banner: string;
  id: number;
  lesson_homeworks: [];
  quizzes: [];
}
