export interface reward_slider {
  user: any;
  score: number;
  months: number;
  certificates: number;
  rewards: SlideObj[];
  type: string;
  innerWidth: number;
  indexSlider: number;
  userReward: any;
  getAllUserRewards: any;
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
