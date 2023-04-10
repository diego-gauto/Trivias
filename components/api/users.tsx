import axios from "axios";

export const getUserApi = async (email: any) => {
  let user = {
    email
  }
  return axios
    .post("https://gonvar.inowu.dev/" + "users/user-info", user)
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
    .put("https://gonvar.inowu.dev/" + "users/update-user-info", user)
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
    .put("https://gonvar.inowu.dev/" + "users/user-membership", user)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const getPastUsers = async () => {
  return axios
    .get("https://gonvar.inowu.dev/" + "users/past-users")
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const updateScorePastUser = async (progress: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "users/update-past-user", progress)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const addPastUserProgress = async (progress: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "users/update-past-user-progress", progress)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const cancelStripe = async (sub: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "users/cancel-stripe", sub)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};