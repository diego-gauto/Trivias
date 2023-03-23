import axios from "axios";

export const newUser = async (user: any) => {
  return axios
    .post("http://94.74.77.165/" + "auth/register", user)
    .then((res) => {
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};