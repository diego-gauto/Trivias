import axios from "axios";

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