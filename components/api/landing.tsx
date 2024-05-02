import axios from 'axios';

export const getLandingInfo = async () => {
  return axios
    .get('https://gonvar.inowu.dev/' + 'landing/landing-info')
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
export const updLandingInfo = async (info: any) => {
  return axios
    .put('https://gonvar.inowu.dev/' + 'landing/update-landing-info', info)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
export const createLandingInfo = async (info: any) => {
  return axios
    .post('https://gonvar.inowu.dev/' + 'landing/create-landing-info', info)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
