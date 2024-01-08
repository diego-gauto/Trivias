import axios, { AxiosResponse } from "axios";

interface NotificationByUser {
  notification_id: number
  user_id: number
  type: string
  status: number
  created_at: string
  source_table: string
  course_id?: number
  season?: number
  lesson?: number
  title?: string
  score?: number
  user_comment_id?: number
  user_like_id?: number
  amount?: number
  product_name?: string
  reward_id?: number
  due_date?: number
}

export const getNotifications = async (user: any) => {
  return axios
    .post<NotificationByUser[]>("https://gonvar.inowu.dev/" + "notifications/by-user", user);
};

export const createNotification = async (data: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "notifications/create", data)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const updateNotificationStatusApi = async (data: any) => {
  return axios
    .put("https://gonvar.inowu.dev/" + "notifications/updateNotification", data)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const updateAllNotificationStatusApi = async (user: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "notifications/updateAllNotifications", user)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

interface AdminMasiveLoterryRow {
  name: string,
  last_name: string,
  email: string,
  phone_number: string,
  ticket_value: number,
}

export const getAdminMassiveLotteryApi = async () => {
  return axios
    .post<{ data: AdminMasiveLoterryRow[], user_count: number }>("https://gonvar.inowu.dev/" + "notifications/adminMassiveLottery");
};