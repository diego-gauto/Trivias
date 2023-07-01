import axios from "axios";

export const getAllTriviasApi = async () => {
  return axios
    .get("https://gonvar.inowu.dev/trivias")
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const getTriviaApi = async (idTrivia: number) => {
  return axios
    .get("https://gonvar.inowu.dev/trivias" + `${idTrivia}`)
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const createTriviaApi = async (trivia: any) => {
  return axios
    .post("https://gonvar.inowu.dev/trivias", trivia)
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const updateTriviaApi = async (idTrivia: number, trivia: any) => {
  return axios
    .post("https://gonvar.inowu.dev/trivias" + `${idTrivia}`, trivia)
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const deleteTriviaApi = async (idTrivia: number, trivia: any) => {
  return axios
    .delete("https://gonvar.inowu.dev/trivias" + `${idTrivia}`, trivia)
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};