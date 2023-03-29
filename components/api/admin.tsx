import axios from "axios";

export const getAdmins = async () => {
  return axios
    .get("http://94.74.77.165/" + "admin/admins")
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};