export interface reward_info {
  rewards: SlideObj[];
}
interface SlideObj {
  id: string;
  title: string;
  about: string;
  points: number;
  months: number;
  path?: string;
  reference: string;
  productType: string;
  type: string;
}
