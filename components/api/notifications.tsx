import axios from "axios";

export const getNotifications = async (user: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "notifications/by-user", user)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
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