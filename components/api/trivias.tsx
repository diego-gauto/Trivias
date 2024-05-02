import axios from 'axios';

export const getAllTriviasApi = async () => {
  return axios
    .get('https://gonvar.inowu.dev/trivia')
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const getTriviaApi = async (idTrivia: number) => {
  return axios
    .get('https://gonvar.inowu.dev/trivia/' + `${idTrivia}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const createTriviaApi = async (trivia: any) => {
  return axios
    .post('https://gonvar.inowu.dev/trivia', trivia)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
export const updateTriviaApi = async (idTrivia: number, trivia: any) => {
  return axios
    .put('https://gonvar.inowu.dev/trivia/' + `${idTrivia}`, trivia)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
export const deleteTriviaApi = async (idTrivia: number, trivia: any) => {
  return axios
    .delete('https://gonvar.inowu.dev/trivia/' + `${idTrivia}`, trivia)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
