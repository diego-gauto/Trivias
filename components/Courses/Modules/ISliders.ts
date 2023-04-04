export interface ICourseData {
  slideType: string;
  slideNumber: number;
  innerWidth: any;
  allCourses: [];
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
