export interface reward_slider {
  isInfinite: boolean;
  slideData: SlideObj[];
  type: string;
}
interface SlideObj {
  isNew: boolean;
  image?: string;
  title: string;
  subtitle: string;
  level?: string;
  imgURL?: string;
  number?: any;
}
