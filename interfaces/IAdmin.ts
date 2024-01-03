export interface ICancelReview {
  created_at: string;
  email: string;
  last_name: string;
  fifth_question: number;
  first_question: string;
  fourth_question: number;
  name: string;
  second_question: string;
  third_question: string;
  user_id: number;
  phone_number: string;
}

export interface IUserFilters {
  country: string;
  name: string;
  offset: number;
  spent: number;
  spent_max: string;
  spent_min: string;
  level: number;
  price: number;
  method: string;
  membership: string;
  state: string;
  come_from: string;
  courses: number;
  progress: number;
  dates_login: {
    valid: number;
    date_1: string;
    date_2: string;
  };
  dates_created: {
    valid: number;
    date_1: string;
    date_2: string;
  };
}

export interface IAdminUsers {
  name: string;
  created_at: string;
  email: string;
  spent: string;
  id: number;
  user_courses: any;
}

export interface IAdminAssignments {
  user_name: string;
  user_email: string;
  course_title: string;
  season_title: string;
  lesson_title: string;
  created_at: number;
  image: string;
  status: number;
  approved: number;
}
