import axios from "axios";

export const paypalToken = () => {
  const clientIdAndSecret =
    "AZNfXk-eHMLlrw5kXq4kdrbZAp4ighalYcUqT_3ey0xAvulKnd_J1yBfs16DPXCk3mqR6PxmiCNw-H_E:EPZA6DDmWd_K2VrrlDz1En4_6G31eHHNHOUvqcIqyMvaMjCF9pMZRb9Wjw6elgdkdjgfLNHhqI6bL9Nn";
  const base64 = Buffer.from(clientIdAndSecret).toString("base64");
  let body = {
    grant_type: "client_credentials"
  }

  return axios
    .post("https://api-m.sandbox.paypal.com/v1/oauth2/token", body, {
      headers: {
        Accept: "application/json",
        "Accept-Language": "en_US",
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${base64}`,
      }
    }).then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
}

export const token = () => {
  return axios
    .post("https://gonvar.inowu.dev/" + "auth/token", {})
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
}

export const changePaypalApiPlan = (data: any) => {

  return axios
    .post(`https://api-m.paypal.com/v1/billing/subscriptions/${data.subscription_id}/revise`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      }
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
}

export const changePaypalPlan = (data: any) => {

  return axios
    .post("https://gonvar.inowu.dev/" + "subscriptions/paypal/subscription/update", data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
}