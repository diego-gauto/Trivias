import axios from "axios";

export const attachPaymentMethod = async (data: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "profile/attach-payment-method", data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
};

export const attachPaymentMethodConekta = async (data: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "profile/conekta/paymentMethod", data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
};

export const setDefaultPaymentMethod = async (card: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "profile/update-payment-method", card)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const setDefaultPaymentMethodConekta = async (card: any) => {
  return axios
    .put("https://gonvar.inowu.dev/" + "profile/conekta/paymentMethod", card)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const detachPaymentMethod = async (card: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "profile/delete-payment-method", card)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const detachPaymentMethodConekta = async (card: any) => {
  return axios
    .delete("https://gonvar.inowu.dev/" + `profile/conekta/${card.conekta_id}/paymentMethod/${card.payment_method}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const userInvoices = async (userId: any) => {
  let user = {
    userId
  }
  return axios
    .post("https://gonvar.inowu.dev/" + "profile/invoices", user)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const updateMembership = async (data: any) => {
  return axios
    .put("https://gonvar.inowu.dev/" + "profile/plan", data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};


export const conektaCancelSubscription = async (data: any) => {
  return axios
    .delete("https://gonvar.inowu.dev/" + `subscriptions/conekta/${data.conekta_id}/subscription/${data.plan_id}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const conektaPausedSubscription = async (data: any) => {
  return axios
    .put("https://gonvar.inowu.dev/" + `subscriptions/conekta/subscription/paused`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const conektaResumeSubscription = async (data: any) => {
  return axios
    .put("https://gonvar.inowu.dev/" + `subscriptions/conekta/subscription/resume`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const getPausedSubscription = async (data: any) => {
  return axios
    .get("https://gonvar.inowu.dev/" + `subscriptions/user/${data.user_id}/paused`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const retrieveConektaCustomerInfo = async (data: any) => {
  return axios
    .get("https://gonvar.inowu.dev/" + `profile/conekta/${data.conekta_id}/user/${data.userId}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};