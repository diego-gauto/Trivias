export enum rewardType {
  digital = 'Digital',
  physical = 'Físico',
}

export interface IReward {
  // the reward's id
  id: string;
  // the reward's about text
  about: string;
  // the reward's image path
  path: string;
  // the reward's reference
  reference: string;
  // the reward's title
  title: string;
  // the reward's type (digital or physical)
  type: rewardType;
  // the number of months associated with the reward
  month?: number;
  // the number of points associated with the reward
  points?: number;
}
