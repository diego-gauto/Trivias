import axios from "axios";

export const getAllUsersApi = async () => {
  return axios
    .get("https://gonvar.inowu.dev/userTrivia")
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const userTrivia = async (user: any) => {
  return axios
    .post("https://gonvar.inowu.dev/userTrivia", user)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const emailTrivia = async (user: any) => {
  return axios
    .post("https://gonvar.inowu.dev/email", user)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};