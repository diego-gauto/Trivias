export interface IModule4_Carousel {
  isInfinite: boolean;

  slideData: SlideObj[];

  type: string;
}
interface SlideObj {
  isNew: boolean;
  image?: string;
  title: string;
  subtitle: string;
  imgURL?: string;
  duration?: string;
}
