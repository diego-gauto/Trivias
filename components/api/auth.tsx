import axios from "axios";

export const login = async (user: any) => {
  return axios
    .post("http://localhost:4001/auth/login")
    .then((res) => {
      window.location.href = "/";
    })
    .catch((error) => {
      console.log(error);
    });
};