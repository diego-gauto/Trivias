export interface ICourses {
  id: number;
  title: string;
  subtitle: string;
  about: string;
  difficulty: string;
  mandatory: number;
  image: string;
  phrase: string;
  certificate_color: string;
  price: number;
  rating: number;
  reviews: number;
  duration: number;
  course_number: number;
  route: string;
  type: string;
  sequential: number;
  professors: IProfessors[];
  categories: ICategories[];
  materials: IMaterials[];
  published: number;
  with_certificate: number;
  material_route: string;
}

export interface IProfessors {
  id: number;
  course_id: number;
  professors_id: number;
  name: string;
  about: string;
  sign: string;
  image: string;
}

export interface ICategories {
  id: number;
  course_id: number;
  categories_id: number;
  name: string;
}

export interface IMaterials {
  id: number;
  course_id: number;
  materials_id: number;
  name: string;
}
