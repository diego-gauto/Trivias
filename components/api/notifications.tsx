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