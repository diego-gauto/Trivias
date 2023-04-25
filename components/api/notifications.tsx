import axios from "axios";

export const getNotifications = async (user: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "notifications/by-user", user)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};