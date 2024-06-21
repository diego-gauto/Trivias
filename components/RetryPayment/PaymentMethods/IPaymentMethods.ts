import { IPm } from '../IRetryPayment';

export interface IPaymentMethods {
  pm: IPm;
  index: number;
  pm_size: number;
  changePaymentMethod: (pm: IPm) => void;
  handleDelete: (pm: IPm) => void;
  isOnlyOne?: boolean;
}
