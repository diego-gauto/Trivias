export interface ICourses {
  title: string;
  subtitle: string;
  about: string;
  certificate_color: string;
  difficulty: string;
  mandatory: boolean;
  image: string;
  phrase: string;
  price: number;
  rating: number;
  reviews: number;
  duration: number;
  type: string;
  sequential: boolean;
  created_at: string;
  route: string;
  course_number: number;
  with_certificate: boolean;
  id: number;
  professors: [IProfessors];
  categories: [ICategories];
  materials: [IMaterials];
  published: boolean;
}
export interface IProfessors {
  id: number;
  name: string;
  about: string;
  sign: string;
  image: string;
}
export interface ICategories {
  id: number;
  name: string;
}
export interface IMaterials {
  id: number;
  name: string;
}
