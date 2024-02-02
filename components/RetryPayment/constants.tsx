import { IPayOption } from "./IRetryPayment";

const card_select = "/images/RetryPayment/card_s.png"
const card_unselect = "/images/RetryPayment/card_uns.png";
const moneda_select = "/images/RetryPayment/moneda_s.png";
const moneda_unselect = "/images/RetryPayment/moneda_uns.png";
const oxxo_select = "/images/RetryPayment/oxxo_s.png";
const oxxo_unselect = "/images/RetryPayment/oxxo_uns.png";
const paypal_s = "/images/RetryPayment/paypal_s.png";
const paypal_uns = "/images/RetryPayment/paypal_uns.png";

export const PayOptions: IPayOption[] = [
  {
    title: "Tarjeta de crédito/debito",
    img_select: card_select,
    img_unselect: card_unselect,
    id: "card",
  },
  // {
  //   title: "",
  //   img_select: paypal_s,
  //   img_unselect: paypal_uns,
  //   id: "paypal",
  // },
  {
    title: "",
    img_select: oxxo_select,
    img_unselect: oxxo_unselect,
    id: "oxxo",
  },
  {
    title: "Transferencia",
    img_select: moneda_select,
    img_unselect: moneda_unselect,
    id: "transfer",
  }
]
export const Year = []