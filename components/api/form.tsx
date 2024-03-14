import axios from "axios";

export const getAllFormsApi = async () => {
  return axios
    .get("https://gonvar.inowu.dev/form")
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const getFormApi = async (idForm: number) => {
  return axios
    .get("https://gonvar.inowu.dev/form/" + `${idForm}`)
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};

export const createFormApi = async (form: any) => {
  return axios
    .post("https://gonvar.inowu.dev/form", form)
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const updateFormApi = async (idForm: number, form: any) => {
  return axios
    .put("https://gonvar.inowu.dev/form/" + `${idForm}`, form)
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const deleteFormApi = async (idForm: number, form: any) => {
  return axios
    .delete("https://gonvar.inowu.dev/form/" + `${idForm}`, form)
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};