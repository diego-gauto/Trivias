import axios from "axios";

export const getMaterialsApi = async () => {
  return axios
    .get("https://gonvar.inowu.dev/" + "materials/getMaterials")
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const createMaterialApi = async (material: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "materials/createMaterial", material)
    .then((res) => {
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const updateMaterialApi = async (material: any) => {
  return axios
    .put("https://gonvar.inowu.dev/" + "materials/updateMaterial", material)
    .then((res) => {
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const deleteMaterialsApi = async (material: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "materials/deleteMaterials", material)
    .then((res) => {
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};