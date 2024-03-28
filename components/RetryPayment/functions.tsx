import { ICard } from "./IRetryPayment";

export const checkEmpty = (card: ICard) => {
  if (card.cvc === "" && card.exp_year === "" && card.exp_month === "" && card.holder === "" && card.number === "") {
    return false
  } else {
    return true
  }
}