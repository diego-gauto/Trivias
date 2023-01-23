export interface reward_slider {
  isInfinite: boolean;
  rewards: SlideObj[];
}
interface SlideObj {
  about: string;
  id: string;
  months: 2;
  path?: string;
  title: string;
  productType: string;
  type: string;
}
