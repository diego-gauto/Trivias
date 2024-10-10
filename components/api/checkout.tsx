import axios from 'axios';

export const addUserCouponApi = async (data: any) => {
  return axios
    .post('https://gonvar.inowu.dev/' + 'checkout/coupon-user', data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const createInvoiceApi = async (data: any) => {
  return axios
    .post('https://gonvar.inowu.dev/' + 'checkout/invoice', data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
export const getCourseForCheckoutApi = async (courseId: any) => {
  return axios
    .get('https://gonvar.inowu.dev/' + 'checkout/' + courseId, courseId)
    .then((res) => {
      return res.data.data[0];
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const conektaPaymentApi = async (order: any) => {
  return axios
    .post('https://gonvar.inowu.dev/' + 'checkout/conekta/payment', order)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const conektaSubscriptionApi = async (order: any) => {
  return axios
    .post('https://gonvar.inowu.dev/' + 'checkout/conekta/subscription', order)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const famsaOxxoApi = async (order: any) => {
  return axios
    .post('https://gonvar.inowu.dev/' + 'checkout/femsa/payment/oxxo', order)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const conektaOxxoApi = async (order: any) => {
  return axios
    .post('https://gonvar.inowu.dev/' + 'checkout/conekta/payment/oxxo', order)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};


export const conektaSpeiApi = async (order: any) => {
  return axios
    .post('https://gonvar.inowu.dev/' + 'checkout/conekta/payment/spei', order)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
