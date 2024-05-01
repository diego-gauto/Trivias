import axios from 'axios';

export const conektaCustomer = async (user: any) => {
  return axios
    .post('https://gonvar.inowu.dev/' + 'auth/conekta/customer', user)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);

      return error;
    });
};

export const conektaCreateSubscription = async () => {
  let headers = {
    accept: 'application/vnd.conekta-v2.1.0+json',
    'Accept-Language': 'es',
    'content-type': 'application/json',
    authorization: 'Bearer key_kzfZaHhMC7Q3f2QPP4Ue9QT',
  };

  let body = {
    plan_id: '20MIN',
  };

  return axios
    .post(
      'https://api.conekta.io/customers/cus_2uH8w6NoVNGrrEvJr/subscription',
      body,
      { headers },
    )
    .then((res) => {
      console.log(res);
      if (res.data.status === 'past_due') {
        axios
          .post(
            'https://api.conekta.io/customers/cus_2uH8w6NoVNGrrEvJr/subscription/cancel',
            {},
            { headers },
          )
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);

            return error;
          });
      }
    })
    .catch((error) => {
      console.log(error);

      return error;
    });
};

export const updateConektaInfo = async (user: any) => {
  return axios
    .post('https://gonvar.inowu.dev/' + 'auth/conekta', user)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const getUsersStripe = async () => {
  return axios
    .get('https://gonvar.inowu.dev/' + 'auth/user/conekta')
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const updateUsersStripe = async (user: any) => {
  return axios
    .put('https://gonvar.inowu.dev/' + 'auth/user/membership', user)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const getConektaUsers = async () => {
  let headers = {
    accept: 'application/vnd.conekta-v2.1.0+json',
    'Accept-Language': 'es',
    'content-type': 'application/json',
    authorization: 'Bearer key_kzfZaHhMC7Q3f2QPP4Ue9QT',
  };
  return axios
    .get('https://api.conekta.io/customers?limit=8', { headers })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const delConektaUsers = async (user: string) => {
  let headers = {
    accept: 'application/vnd.conekta-v2.1.0+json',
    'Accept-Language': 'es',
    'content-type': 'application/json',
    authorization: 'Bearer key_kzfZaHhMC7Q3f2QPP4Ue9QT',
  };
  return axios
    .delete('https://api.conekta.io/customers/' + user, { headers })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const getImage = async () => {
  return axios
    .get(
      'https://barcodes.conekta.com/1fcff263b5076a42b66294ede6fc5c0cf2fa39c4.png',
    )
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const canelConektaUserArray = async (user: any) => {
  return axios
    .put('https://gonvar.inowu.dev/' + 'subscriptions/conekta/array', user)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};
