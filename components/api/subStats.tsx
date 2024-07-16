import axios from "axios";

export const getStats = async (range: any) => {
  return axios
    .post('https://gonvar.inowu.dev/subStats', range)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};