import { IMaterialData } from "../components/CourseModal/Materials/IModalMaterials";

export interface ICourse {
  // course id
  id: number;
  // same as the id
  pay: boolean;
  data: any;
  type: string;
  duration: number;
  professors: [IProfessors];
  image: string;
  rating: number;
  reviews: number;
  about: string;
  materials: [IMaterialData];
  final_date: number;
  documentID: string;
  uid: string;
  user: {
    final_date: number;
  };
  // the course about
  title: string;
  difficulty: string;
  price: number;
  createdAt: any;
  lessons: any;
  reference: string;
  seasons: any;
  totalLessons: number;
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
