export interface ICourseData {
  slideType: string;
  slideNumber: number;
  innerWidth: any;
  allCourses: [];
  user: {
    final_date: number;
    user_courses: [IUserCourse];
  };
}
export interface ICourse {
  id: number;
  title: string;
  difficulty: string;
  image: string;
  professors: [IProfessors];
  progress: number;
  seasons: [ISeasons];
  type: string;
  pay: boolean;
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
