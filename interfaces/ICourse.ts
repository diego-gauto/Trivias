import { IMaterialData } from '../components/Modals/CourseModal/Materials/IModalMaterials';

export interface ICourse {
  // course id
  id: number;
  // same as the id
  pay: boolean;
  material_route: string;
  data: any;
  type: 'Mensual' | 'Gratis';
  duration: number;
  professors: [IProfessors];
  image: string;
  rating: number;
  reviews: number;
  about: string;
  totalDuration: number;
  materials: [IMaterialData];
  final_date: number;
  documentID: string;
  uid: string;
  user: {
    level: number;
    final_date: number;
  };
  // the course about
  title: string;
  difficulty: 'Avanzado' | 'Fácil' | 'Intermedio' | 'Máster' | 'Muy Fácil';
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
  image: string;
  name: string;
  about: string;
}
