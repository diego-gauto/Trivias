import { IPm } from "../IRetryPayment";

export interface IPaymentMethods {
  pm: IPm;
  index: number;
  pm_size: number;
  changePaymentMethod: (index: number, deflt: boolean) => void;
}
