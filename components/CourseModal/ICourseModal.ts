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
    totalDuration: number;
  };
  user: {
    level: number;
    final_date: number;
    plan_name?: string;
    method: string;
  };
}
export interface ISeasons {
  lessons: [ILessons];
}
export interface ILessons {}

export interface IProfessors {
  image: string;
  name: string;
  about: string;
}
