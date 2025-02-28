export interface IUserInfoResponse {
  user: IUserInfo[];
  payment_methods: any[];
  courses: any[];
  progress: IProgress[];
  history: IHistory[];
  certificates: any[];
  certificates_filter: any[];
  roles: any[];
}

type MembershipMethod =
  | 'admin'
  | 'conekta'
  | 'paypal'
  | 'spei'
  | 'oxxo'
  | 'stripe'
  | '0';

export interface IUserInfo {
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
  country: string;
  conekta_id: any;
  terms: number;
  come_from: string;
  user_id: number;
  final_date: number;
  level: number;
  method: MembershipMethod | null;
  payment_method: any;
  plan_id: any;
  plan_name: any;
  start_date: number;
  type: any;
  origin_state: string | null;
  offer_reference: string;
  is_canceled: number;
  admin_update_id: number | null;
  femsa_customer_id: string | null;
}

export interface IProgress {
  id: number;
  user_id: number;
  seconds: number;
  time: number;
  lessons_id: number;
  status: number;
}

export interface IHistory {
  id: number;
  user_id: number;
  course_id: number;
  season_id: number;
  lesson_id: number;
  last_seen: string;
}

export interface IUserInfoResult extends IUserInfo {
  payment_methods: any[];
  user_courses: any[];
  user_progress: IProgress[];
  user_history: IHistory[];
  user_certificates: any[];
  roles: Role[];
  photoURL?: string;
}

type RoleValue =
  | 'course'
  | 'coupons'
  | 'blogs'
  | 'rewards'
  | 'users'
  | 'landing'
  | 'payments'
  | 'homeworks'
  | 'comments'
  | 'trivias'
  | 'trivias_list'
  | 'forms'
  | 'forms_list'
  | 'tickets_list'
  | 'memberships_list'
  | 'subscriptions'
  | 'active_memberships';

export interface Role {
  id: number;
  role: RoleValue;
  source_table: string;
  create?: string;
  edit?: string;
  delete?: string;
  view: string;
  user_id: number;
  courses?: string;
  request?: number;
  report?: number;
  download?: number;
  abm_products?: number;
  abm_sellers?: number;
  create_access_invoices?: number;
  create_products_invoices?: number;
}
