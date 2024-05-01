import { IReward } from '../../interfaces/IReward';

export interface IRewardModalProps {
  // modal's visibility state
  show: boolean;
  // modal's visibility state setter
  setShow: (show: boolean) => void;
  // the reward object
  reward: IReward | any;
  // the user object
  user?: any;
  // the current user's score (in points or months)
  score: number;
  // if reward is in points or months.
  isTimeReward: boolean;
}
