export const TOLERANCE_DAYS_COUNT = 10;

export const RECURRING_PAYMENT_LEVELS = [1, 4, 7];
export const NO_RECURRING_PAYMENT_LEVELS = [0, 5, 6, 8];

export type MembershipMethodValue =
  | 'admin'
  | 'conekta'
  | 'stripe'
  | 'paypal'
  | 'oxxo'
  | 'spei';

export const haveAccess = (
  userLevel: number,
  finalDate: number,
  userRole: 'user' | 'admin' | 'superAdmin',
  method: MembershipMethodValue
) => {
  const today = new Date().getTime() / 1000;
  const tolerance = TOLERANCE_DAYS_COUNT * 24 * 60 * 60;
  const finalDate2 = new Date(finalDate * 1000);

  if (
    NO_RECURRING_PAYMENT_LEVELS.includes(userLevel) &&
    finalDate2.getTime() / 1000 > today
  ) {
    return true;
  }

  if (
    RECURRING_PAYMENT_LEVELS.includes(userLevel) &&
    method === 'conekta' &&
    finalDate2.getTime() / 1000 > today - tolerance
  ) {
    return true;
  }

  if (userRole === 'superAdmin') {
    return true;
  }

  return false;
};

export const haveAccessFinal = (
  userLevel: number,
  finalDate: number,
  userRole: 'user' | 'admin' | 'superAdmin',
  method: MembershipMethodValue
) => {
  const today = new Date().getTime() / 1000;
  const tolerance = TOLERANCE_DAYS_COUNT * 24 * 60 * 60;

  if (NO_RECURRING_PAYMENT_LEVELS.includes(userLevel) && finalDate < today) {
    return true;
  }

  if (
    RECURRING_PAYMENT_LEVELS.includes(userLevel) &&
    method === 'conekta' &&
    finalDate < today - tolerance
  ) {
    return true;
  }

  if (userRole === 'superAdmin') {
    return true;
  }

  return false;
};

export interface IUserData {
  id: number;
  name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  role: 'user' | 'admin' | 'superAdmin';
  photo: string;
  score: number;
  stripe_id: string;
  provider: string;
  created_at: string;
  past_user: string;
  subscription: number;
  last_sign_in: string;
  country: any;
  conekta_id: string;
  terms: number;
  come_from: string;
  origin_state: string;
  offer_reference: string;
  user_id: number;
  final_date: number;
  level: number;
  method: MembershipMethodValue;
  payment_method: any;
  plan_id: any;
  plan_name: any;
  start_date: number;
  type: number;
  payment_methods: any[];
  user_courses: any[];
  user_progress: any[];
  user_history: any[];
  user_certificates: any[];
  roles: any[];
}
