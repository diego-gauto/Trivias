export interface ICourses {
  published: number;
  id: number;
  seasons: [ISeasons];
}
export interface ISeasons {
  id: number;
  lessons: [ILessons];
}
export interface ILessons {
  id: number;
}
