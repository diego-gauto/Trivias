export interface reward_slider {
  user: any;
  score: number;
  rewards: SlideObj[];
  type: string;
  innerWidth: number;
  indexSlider: number;
}
interface SlideObj {
  id: string;
  title: string;
  about: string;
  points?: number;
  months: number;
  path?: string;
  reference: string;
  productType: string;
  type: string;
}
