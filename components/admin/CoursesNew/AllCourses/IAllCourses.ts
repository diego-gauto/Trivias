export interface IAllCourses {
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
  openCourseEdit: number;
  openCourse: any;
  route: string;
  course_number: number;
  moveTo: any;
  id: number;
  index: number;
  getAllCourses: any;
  material_route: string;
  with_certificate: boolean;
  professors: IProfessors[];
  categories: ICategories[];
  materials: IMaterials[];
  published: boolean;
  allProfessors: IProfessors[];
  allCategories: ICategories[];
  allMaterials: IMaterials[];
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
