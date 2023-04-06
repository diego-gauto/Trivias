import axios from "axios";

export const getProfessorApi = async () => {
  return axios
    .get("http://94.74.77.165/" + "professors/getProfessors")
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const createProfessorApi = async (professor: any) => {
  return axios
    .post("http://94.74.77.165/" + "professors/createProfessor", professor)
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const updateProfessorApi = async (professor: any) => {
  return axios
    .put("http://94.74.77.165/" + "professors/updateProfessor", professor)
    .then((res) => {
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const deleteProfessorApi = async (professor: any) => {
  return axios
    .post("http://94.74.77.165/" + "professors/deleteProfessor", professor)
    .then((res) => {
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const updateImagesfromProfessorApi = async (professor: any) => {
  return axios
    .put("http://94.74.77.165/" + "professors/updateProfessorImages", professor)
    .then((res) => {
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};