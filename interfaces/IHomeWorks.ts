export interface IHomeWorkModal {
  id: string;
  lesson: number;
  season: number;
  status: boolean;
  title: string;
  userId: string;
  courseId: string;
  userEmail: string;
  userName: string;
  about?: string;
  aproved: boolean;
  lessonId: string;
}
