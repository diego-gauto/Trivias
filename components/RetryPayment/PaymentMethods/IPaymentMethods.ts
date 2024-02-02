import { IPm } from "../IRetryPayment";

export interface IPaymentMethods {
  pm: IPm;
  index: number;
  changePaymentMethod: (index: number, deflt: boolean) => void;
}
