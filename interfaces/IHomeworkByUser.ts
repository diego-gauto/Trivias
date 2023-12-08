/*
homework_id	status	approved	lesson_id	season_id
*/
export interface IHomeworksByUserResponse {
  data: IReducedHomework[];
}

export interface IReducedHomework {
  homework_id: number;
  status: number;
  approved: number;
  lesson_id: number;
  season_id: number;
}
