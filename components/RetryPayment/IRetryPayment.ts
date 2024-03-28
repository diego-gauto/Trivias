export interface IPm {
  last4: string;
  brand: string;
  default: boolean;
  id: string;
}
export type TPayOptionId = "card" | "transfer" | "oxxo" | "paypal";
export interface IPayOption {
  title: string;
  img_select: string;
  img_unselect: string;
  id: TPayOptionId;
}
export interface ICard {
  holder: string;
  number: string;
  cvc: string;
  exp_month: string;
  exp_year: string;
}
export type TKey = "holder" | "number" | "cvc" | "exp_month" | "exp_year";
