import axios from "axios";

export const getHomeworksApi = async () => {
  return axios
    .get("https://gonvar.inowu.dev/" + "homeworks")
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const addHomeworkApi = async (homework: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "homeworks/add-homework", homework)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const getHomeworkUserApi = async (homework: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "homeworks/user-homework", homework)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const reviewHomeworkApi = async (homework: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "homeworks/update-homework", homework)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
