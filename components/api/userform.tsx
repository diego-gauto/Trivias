import axios from 'axios';

export const getAllUsersFormApi = async () => {
  return axios
    .get('https://gonvar.inowu.dev/userForm')
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const getUsersByFormApi = async (formId: number) => {
  return axios
    .get('https://gonvar.inowu.dev/userForm/' + `${formId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const createUserFormApi = async (userForm: any) => {
  return axios
    .post('https://gonvar.inowu.dev/userForm', userForm)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
