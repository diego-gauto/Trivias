import axios from "axios";

export const createPaymentMethod = async (data: any) => {
  return axios
    .post("http://94.74.77.165/" + "profile/create-payment-method", data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
};

export const attachPaymentMethod = async (data: any) => {
  return axios
    .post("http://94.74.77.165/" + "profile/attach-payment-method", data)
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
    .post("http://94.74.77.165/" + "profile/update-payment-method", card)
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
    .post("http://94.74.77.165/" + "profile/delete-payment-method", card)
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
    .post("http://94.74.77.165/" + "profile/invoices", user)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};