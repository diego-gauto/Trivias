export interface IUserHomeworkResponse {
  data: IUserHomework[];
}

export interface IUserHomework {
  id: number;
  approved: number;
  comment: string;
  image: string;
  lesson_id: number;
  season_id: number;
  courses_id: number;
  status: number;
  user_id: number;
  title: string;
  created_at: string;
}
