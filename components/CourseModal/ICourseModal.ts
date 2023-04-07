import { IMaterialData } from "./Materials/IModalMaterials";

export interface ICourseModal {
  show: boolean;
  setShow: any;
  course: {
    id: number;
    pay: boolean;
    data: any;
    seasons: any;
    type: string;
    difficulty: string;
    title: string;
    duration: number;
    professors: [IProfessors];
    image: string;
    price: number;
    rating: number;
    reviews: number;
    about: string;
    materials: [IMaterialData];
  };
  user: {
    level: number;
    final_date: number;
  };
}
export interface ISeasons {
  lessons: [ILessons];
}
export interface ILessons {}

export interface IProfessors {
  path: string;
  name: string;
  about: string;
}
