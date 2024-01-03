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
  // getAllUserRewards: any;
  courses: course[];
  completeCertificates: courses[];
  getRewardData: any;
}
export interface SlideObj {
  id: string | number;
  title: string;
  about: string;
  points: number;
  months: number;
  month: number;
  path?: string;
  price: number;
  totalLessons: number;
  reference: string;
  productType: string;
  type: string;
  lessonsLeft: number;
  image: string;
  // month: number;
  // price: number;
  product_type: string;
  published: string;
}
interface course {
  lessonsLeft: number;
  maxLessons: number;
  total: number;
  name: string;
}
interface courses {}

export interface IUserReward {
  reward_id: string | number;
  status: boolean;
  created_at: any;
}
