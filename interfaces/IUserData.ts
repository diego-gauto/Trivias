export interface IUserDataProps {
  name: string;
  lastName: string;
  phoneNumber: string;
  stripeId: string; //CUSTOMER ID FROM STRIPE
  id: string;
  membership: {
    //OBJECT PLAN GONVAR
    level: number;
    finalDate: number;
    method: string;
    brand: string;
    last4: number;
  };
}
export interface IUser {
  name: string;
  last_name: string;
  email: string;
  phone_number: string;
  stripeId: string;
  id: number;
  user_courses: Array<any>;
  level: number;
  final_date: any;
  plan_name: string;
  method: string;
  role: string;
  conekta_id: string;
}
