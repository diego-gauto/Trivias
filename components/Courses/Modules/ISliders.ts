export interface ICourseData {
  slideType: string;
  containLoader: boolean;
  slideNumber: number;
  innerWidth: any;
  allCourses: [];
  user: {
    method: string;
    final_date: number;
    level: number;
    role: string;
    user_courses: [IUserCourse];
    user_history: [IUserHistory];
    user_progress: [IUserProgress];
  };
}
export interface ICourse {
  id: number;
  lessonId: number;
  days: number;
  seasonId: number;
  lessonProgress: number;
  title: string;
  difficulty: string;
  image: string;
  professors: [IProfessors];
  progress: number;
  seasons: [ISeasons];
  type: string;
  pay: boolean;
  currentSeason: number;
  currentLesson: number;
}
interface IProfessors {
  name: string;
}
interface ISeasons {
  name: string;
  season: number;
}
export interface IUserCourse {
  course_id: number;
  final_date: number;
}
export interface IUserHistory {
  course_id: number;
  season_id: number;
  lesson_id: number;
  final_date: number;
}
export interface IUserProgress {
  lessons_id: number;
  seconds: number;
  time: number;
}
