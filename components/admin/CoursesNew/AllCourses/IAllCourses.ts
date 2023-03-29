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
  moveTo: any;
  id: number;
  index: number;
  professors: [IProfessors];
  categories: [ICategories];
  materials: [IMaterials];
  allProfessors: [IProfessors];
  allCategories: [ICategories];
  allMaterials: [IMaterials];
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
