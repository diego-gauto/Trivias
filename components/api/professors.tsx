import axios from "axios";

export const getProfessorApi = async () => {
  return axios
    .get("http://94.74.77.165/" + "professors/getProfessors")
    .then((res) => {
      console.log(res)
      return res
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
      console.log(res)
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const updateProfessorApi = async (professor: any) => {
  console.log(professor)
  return axios
    .put("http://94.74.77.165/" + "professors/updateProfessor", professor)
    .then((res) => {
      console.log(res)
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};