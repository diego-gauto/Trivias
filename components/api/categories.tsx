import axios from "axios";

export const getCategoriesApi = async () => {
  return axios
    .get("https://gonvar.inowu.dev/" + "categories/getCategories")
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const createCategoryApi = async (category: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "categories/createCategory", category)
    .then((res) => {
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const updateCategoryApi = async (category: any) => {
  return axios
    .put("https://gonvar.inowu.dev/" + "categories/updateCategory", category)
    .then((res) => {
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const deleteCategoryApi = async (category: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "categories/deleteCategories", category)
    .then((res) => {
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};