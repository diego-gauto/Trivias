export interface IUserData {
  id: number;
  name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  role: UserRole;
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
  origin_state: string | null;
  offer_reference: string;
  femsa_customer_id: string | null;
  user_id: number;
  final_date: number;
  level: number;
  method: string | null;
  payment_method: string | null;
  plan_id: string | null;
  plan_name: string | null;
  start_date: number;
  type: number | null;
  admin_update_id: number;
  is_canceled: number;
  payment_methods: any[];
  user_courses: UserCourse[];
  user_progress: UserProgress[];
  user_history: UserHistory[];
  user_certificates: UserCertificate[];
  roles: Role[];
}

export type UserRole = 'user' | 'admin' | 'superAdmin';

export interface UserCourse {
  id: number;
  user_id: number;
  course_id: number;
  final_date: number;
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

export type RoleValue =
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
  | 'distributors';

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
  download: number | null;
}
