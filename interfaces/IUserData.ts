export interface IUserDataProps {
  name:string,
  phoneNumber: string,
  stripeId: string, //CUSTOMER ID FROM STRIPE
  id: string,
  membership:{      //OBJECT PLAN GONVAR
    level:number,
    finalDate: number,
    method: string,
    brand: string,
    last4: number,
  }
}