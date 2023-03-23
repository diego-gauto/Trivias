import axios from "axios";

export const getUserApi = async (email: any) => {
  let user = {
    email
  }
  return axios
    .post("http://94.74.77.165/" + "users/user-info", user)
    .then((res) => {
      return res.data.data[0];
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};