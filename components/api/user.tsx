import axios from "axios";

export const getUsers = async () => {
  console.log(process.env.REACT_APP_API_URL);

  return axios
    .post("https://www.gonvar.io/" + `users`, { "test": 44 })
    .then((res) => {
      console.log(res);

      return res;
    })
    .catch((error) => {
      console.log(error);
    });
};