export interface IAxiosCourseResponse {
  data: ICourseResponse[];
}

export interface ICourseResponse {
  id: number;
  about: string;
  certificate_color: string;
  difficulty: string;
  mandatory: number;
  image: string;
  phrase: string;
  price: number;
  rating: number;
  reviews: number;
  subtitle: string;
  title: string;
  type: string;
  sequential: number;
  created_at: string;
  duration: number;
  published: number;
  route: string;
  course_number: number;
  with_certificate: number;
  material_route: string;
  professors: IProfessor[];
  categories: ICategory[];
  materials: IMaterial[];
  lessons: ILessonUsersIDs[];
  seasons: ISeason[];
}

export interface IProfessor {
  id: number;
  course_id: number;
  professors_id: number;
  name: string;
  about: string;
  sign: string;
  image: string;
}

export interface ICategory {
  id: number;
  course_id: number;
  categories_id: number;
  name: string;
}

export interface IMaterial {
  id: number;
  course_id: number;
  materials_id: number;
  name: string;
}

export interface ILessonUsersIDs {
  users: number[];
  id: number;
}

export interface ISeason {
  id: number;
  season: number;
  name: string;
  course_id: number;
  lessons: ILesson[];
}

export interface ILesson {
  id: number;
  about: string;
  banner: string;
  duration: number;
  homework: number;
  quiz: number;
  link: string;
  number: number;
  points: number;
  title: string;
  seasons_id: number;
  objectives: string;
  extra_material: string;
  lesson_material: any[];
  users: number[];
  progress: IProgress[];
  lesson_homeworks?: ILessonHomeworks;
}

export interface IProgress {
  id: number;
  user_id: number;
  seconds: number;
  time: number;
  lessons_id: number;
  status: number;
}

export interface ILessonHomeworks {
  lessons_id: number;
  title: string;
  about: string;
  id: number;
  points: number;
}
