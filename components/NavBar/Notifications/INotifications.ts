export interface INotifications {
  message: string;
  status: boolean;
  title: string;
  type: string;
  courseID: number;
  seasonID: number;
  lessonID: number;
  created_at: string;
  openNotifications: any;
  notification_id: number;
  unReadNotification: number;
  setUnReadNotification: any;
}
