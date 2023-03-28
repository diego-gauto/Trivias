import axios from "axios";

export const createPaymentMethodApi = async (card: any) => {
  return axios
    .post("http://94.74.77.165/" + "users/create-payment-method", card)
    .then((res) => {
      return { card: res.data.paymentMethod.card, id: res.data.paymentMethod.id };
    })
    .catch((error) => {
      return error.response
    });
};

export const stripeSubscriptionApi = async (data: any) => {
  return axios
    .post("http://94.74.77.165/" + "checkout/subscription-stripe", data)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const stripePaymentApi = async (data: any) => {
  return axios
    .post("http://94.74.77.165/" + "checkout/stripe-payment", data)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const createInvoiceApi = async (data: any) => {
  return axios
    .post("http://94.74.77.165/" + "checkout/invoice", data)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      return error.response.data;
    });
};