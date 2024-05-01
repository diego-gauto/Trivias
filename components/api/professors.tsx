import axios from 'axios';

export interface Professor {
  id: number;
  about: string;
  name: string;
  image: string;
  sign: string;
  professors_id: number;
}

export const getProfessorApi = async () => {
  return axios.get<{
    data: Professor[];
  }>('https://gonvar.inowu.dev/' + 'professors/getProfessors');
};
export const createProfessorApi = async (professor: any) => {
  return axios
    .post('https://gonvar.inowu.dev/' + 'professors/createProfessor', professor)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
export const updateProfessorApi = async (professor: any) => {
  return axios
    .put('https://gonvar.inowu.dev/' + 'professors/updateProfessor', professor)
    .then((res) => {
      return res.data.msg;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
export const deleteProfessorApi = async (professor: any) => {
  return axios
    .post('https://gonvar.inowu.dev/' + 'professors/deleteProfessor', professor)
    .then((res) => {
      return res.data.msg;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
export const updateImagesfromProfessorApi = async (professor: any) => {
  return axios
    .put(
      'https://gonvar.inowu.dev/' + 'professors/updateProfessorImages',
      professor,
    )
    .then((res) => {
      return res.data.msg;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
