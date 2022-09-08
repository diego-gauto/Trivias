export interface UserDataProps {
  name:string,
  phoneNumber: string,
  stripeId: string,
  id: string,
  membership:{
    level:number,
    finalDate: number,
    method: string,
    brand: string,
    last4: number,
  }

}
export interface PaymentMethodProps {

}