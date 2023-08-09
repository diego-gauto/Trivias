import axios from "axios";

export const createPaymentMethodApi = async (card: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "users/create-payment-method", card)
    .then((res) => {
      return { card: res.data.paymentMethod.card, id: res.data.paymentMethod.id };
    })
    .catch((error) => {
      return error.response
    });
};

export const stripeSubscriptionApi = async (data: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "checkout/subscription-stripe", data)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const stripePaymentApi = async (data: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "checkout/stripe-payment", data)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const addUserCouponApi = async (data: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "checkout/coupon-user", data)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const createInvoiceApi = async (data: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "checkout/invoice", data)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      return error.response.data;
    });
};
export const getCourseForCheckoutApi = async (courseId: any) => {
  return axios
    .get("https://gonvar.inowu.dev/" + "checkout/" + courseId, courseId)
    .then((res) => {
      return res.data.data[0]
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const deleteSubscriptionAfterCreation = async (subscription: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "checkout/delete/subscription", subscription)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const conektaPaymentApi = async (order: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "checkout/conekta", order)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
