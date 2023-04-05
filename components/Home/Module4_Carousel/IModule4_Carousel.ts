export interface IModule4_Carousel {
  isInfinite: boolean;
  slideData: SlideObj[];
  type: string;
  title: string;
  user?: any;
  courses: any;
}
interface SlideObj {
  isNew: boolean;
  image?: string;
  title: string;
  subtitle: string;
  level?: string;
  imgURL?: string;
  number?: any;
  professors: any;
}
