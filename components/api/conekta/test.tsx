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

export const conektaCreateSubscription = async () => {
  let headers = {
    accept: 'application/vnd.conekta-v2.1.0+json',
    'Accept-Language': 'es',
    'content-type': 'application/json',
    authorization: 'Bearer key_kzfZaHhMC7Q3f2QPP4Ue9QT'
  }

  let body = {
    plan_id: '20MIN'
  }

  return axios
    .post("https://api.conekta.io/customers/cus_2uH8w6NoVNGrrEvJr/subscription", body, { headers })
    .then((res) => {
      console.log(res);
      if (res.data.status === "past_due") {
        axios
          .post("https://api.conekta.io/customers/cus_2uH8w6NoVNGrrEvJr/subscription/cancel", {}, { headers })
          .then((res) => {
            console.log(res);

          })
          .catch((error) => {
            console.log(error);

            return error
          });
      }
    })
    .catch((error) => {
      console.log(error);

      return error
    });
};

export const getStripeInfo = async (user: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "users/search/stripe/customer", user)
    .then((res) => {
      return res
    })
    .catch((error) => {
      return error
    });
};

export const updateConektaInfo = async (user: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "auth/conekta", user)
    .then((res) => {
      return res
    })
    .catch((error) => {
      return error
    });
};