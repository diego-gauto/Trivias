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
        user_history: res.data.history,
        user_certificates: res.data.certificates,
        roles: res.data.roles
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

export const getPastUsers = async (range: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "users/past-users", range)
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
export const updateMembershipDaysApi = async (user: any) => {
  return axios
    .put("https://gonvar.inowu.dev/" + "admin/updateMembership", user)
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

export const cancelPaypal = async (user: any) => {
  const clientIdAndSecret =
    "ATu3hpVYAX9Jq288cIdG2ZU0WftbBjcKGt0cwEe7naroEao2JgBfBmpQXGaxSwDgUEP4mc4l8JNJjBbz:ENjzRHojJfRX2yS6vJAaFg54xyzuTEXVIe-6Fd3cDk3IXHshojM3u5nEsk6-h-QWSMxN_AAhqoz7Fm54";
  const base64 = Buffer.from(clientIdAndSecret).toString("base64");
  let body = {
    grant_type: "client_credentials"
  }
  return axios
    .post("https://api-m.paypal.com/v1/oauth2/token", body, {
      headers: {
        Accept: "application/json",
        "Accept-Language": "en_US",
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${base64}`,
      }
    }).then((res) => {
      return axios
        .post(`https://api-m.paypal.com/v1/billing/subscriptions/${user.planId}/cancel`,
          { body: JSON.stringify({ reason: "Not satisfied with the service" }) },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${res.data.access_token}`,
            }
          }).then((result) => {
            return axios
              .post("https://gonvar.inowu.dev/" + "subscriptions/paypal-canceled-subscription", user)
              .then((res) => {
                return res;
              })
              .catch((error) => {
                console.log(error);
                return error
              });
          }).catch((error) => {
            console.log(error);
            return error
          });
    }).catch((error) => {
      console.log(error);
      return error
    });
};
export const getCertificateApi = async (certificate_id: any) => {
  return axios
    .get("https://gonvar.inowu.dev/" + "users/user-certificate/" + certificate_id)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const updateStripe = async (body: any) => {
  return axios
    .post("https://gonvar.inowu.dev/users/update-stripe-wa", body)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};