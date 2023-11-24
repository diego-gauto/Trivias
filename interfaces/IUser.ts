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

export interface IUserInfo {
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
  conekta_id: any;
  terms: number;
  come_from: string;
  user_id: number;
  final_date: number;
  level: number;
  method: any;
  payment_method: any;
  plan_id: any;
  plan_name: any;
  start_date: number;
  type: any;
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
  roles: any[];
  photoURL: string;
}
