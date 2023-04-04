import axios from "axios";

export const getHomeworksApi = async () => {
  return axios
    .get("http://94.74.77.165/" + "homeworks")
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
    .post("http://94.74.77.165/" + "homeworks/add-homework", homework)
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
    .post("http://94.74.77.165/" + "homeworks/user-homework", homework)
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
    .post("http://94.74.77.165/" + "homeworks/update-homework", homework)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
