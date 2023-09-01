import axios from "axios";

export const conektaCustomer = async (user: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "auth/conekta/customer", user)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      console.log(error);

      return error
    });
};

export const newUser = async (user: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "auth/register", user)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const updateUserPassword = async (user: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "auth/update-password", user)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const sendEmailPassword = async (user: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "auth/reset-password", user)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const googleTokens = async (code: any) => {
  let googleCode: any = {
    code: code
  }
  return axios
    .post("https://gonvar.inowu.dev/" + "auth/register/google-tokens", googleCode)
    .then((res) => {
      localStorage.setItem("method", "google");
      localStorage.setItem("token", res.data.refresh_token);
      return axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${res.data.access_token}` },
      }).then((res) => {
        return res.data
      })
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const facebookUserInfo = (userData: any) => {
  return axios.get(`https://graph.facebook.com/${userData.id}?fields=id,name,email,picture&access_token=${userData.access_token}`).then((res) => {
    return res.data
  })
    .catch((error) => {
      return error
    })
}

export const loginWithProviderApi = async (user: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "auth/login-with-providers", user)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const updatePastUser = async (user: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "auth/register-past-user", user)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const testApi = async (user: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "auth/login-past-users-test", user)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const updateLastSignIn = async (user: any) => {
  return axios
    .put("https://gonvar.inowu.dev/" + "users/updateLastSignIn", user)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const pastT = async () => {
  return axios
    .get("https://gonvar.inowu.dev/" + "users/temp")
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const updateStripe = async (user: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "users/update-stripe-data", user)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};