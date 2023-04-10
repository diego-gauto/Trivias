export interface IModule4_Carousel {
  isInfinite: boolean;
  slideData: SlideObj[];
  type: string;
  title: string;
  user?: any;
  courses: any;
}
interface SlideObj {
  seasons: any;
  isNew: boolean;
  image?: string;
  banner: string;
  title: string;
  subtitle: string;
  level?: string;
  imgURL?: string;
  number?: any;
  professors: any;
  materials: any;
  categories: any;
  difficulty: string;
}
