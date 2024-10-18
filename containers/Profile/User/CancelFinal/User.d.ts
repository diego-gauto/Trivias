export interface IUser {
  id: number;
  name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  role: string;
  photo: string;
  score: number;
  stripe_id: string;
  provider: string;
  created_at: string;
  past_user: string;
  subscription: number;
  last_sign_in: string;
  country: string;
  conekta_id: string;
  terms: number;
  come_from: string;
  origin_state: string;
  offer_reference: string;
  femsa_customer_id: any;
  user_id: number;
  final_date: number;
  level: number;
  method: string;
  payment_method: string;
  plan_id: string;
  plan_name: string;
  start_date: number;
  type: number;
  admin_update_id: any;
  is_canceled: number;
  payment_methods: any[];
  user_courses: any[];
  user_progress: UserProgress[];
  user_history: UserHistory[];
  user_certificates: UserCertificate[];
  roles: any[];
}

export interface UserProgress {
  id: number;
  user_id: number;
  seconds: number;
  time: number;
  lessons_id: number;
  status: number;
}

export interface UserHistory {
  id: number;
  user_id: number;
  course_id: number;
  season_id: number;
  lesson_id: number;
  last_seen: string;
}

export interface UserCertificate {
  id: number;
  user_id: number;
  course_id: number;
  folio: string;
  created_at: string;
}
