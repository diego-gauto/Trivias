import axios from "axios";

export const getUserApi = async (email: any) => {
  let user = {
    email
  }
  return axios
    .post("http://94.74.77.165/" + "users/user-info", user)
    .then((res) => {
      return {
        ...res.data.user[0],
        payment_methods: res.data.payment_methods.data,
        user_courses: res.data.courses,
        user_progress: res.data.progress,
        user_history: res.data.history
      };
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const updateUserInfo = async (user: any) => {
  return axios
    .put("http://94.74.77.165/" + "users/update-user-info", user)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const updateMembership = async (user: any) => {
  return axios
    .put("http://94.74.77.165/" + "users/user-membership", user)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};