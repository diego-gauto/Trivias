export interface IAuthContext {
  user: IUser | null;
  isAuthenticating: boolean;
}

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
  user_id: number;
  final_date: number;
  level: number;
  method: string | null;
  payment_method: string | null;
  plan_id: any;
  plan_name: string;
  start_date: number;
  type: number;
  user_courses: IUserCourse[];
  user_progress: IUserProgress[];
  user_history: IUserHistory[];
  user_certificates: IUserCertificate[];
  roles: any[];
}

export interface IUserCourse {
  id: number;
  user_id: number;
  course_id: number;
  final_date: number;
}

export interface IUserProgress {
  id: number;
  user_id: number;
  seconds: number;
  time: number;
  lessons_id: number;
  status: number;
}

export interface IUserHistory {
  id: number;
  user_id: number;
  course_id: number;
  season_id: number;
  lesson_id: number;
  last_seen: string;
}

export interface IUserCertificate {
  id: number;
  user_id: number;
  course_id: number;
  folio: string;
  created_at: string;
}
