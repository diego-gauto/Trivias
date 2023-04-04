import axios from "axios";

export const getMaterialsApi = async () => {
  return axios
    .get("http://94.74.77.165/" + "materials/getMaterials")
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
    .post("http://94.74.77.165/" + "materials/createMaterial", material)
    .then((res) => {
      console.log(res)
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const updateMaterialApi = async (material: any) => {
  return axios
    .put("http://94.74.77.165/" + "materials/updateMaterial", material)
    .then((res) => {
      console.log(res)
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};