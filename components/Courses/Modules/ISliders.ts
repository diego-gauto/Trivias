export interface ICourseData {
  slideType: string;
  slideNumber: number;
  innerWidth: any;
  allCourses: [];
  user: {
    final_date: number;
  };
}
export interface ICourse {
  title: string;
  difficulty: string;
  image: string;
  professors: [IProfessors];
  progress: number;
  seasons: [ISeasons];
  type: string;
}
interface IProfessors {
  name: string;
}
interface ISeasons {
  name: string;
  season: number;
}
