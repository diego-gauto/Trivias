import axios from "axios";

export const getCategoriesApi = async () => {
  return axios
    .get("http://94.74.77.165/" + "categories/getCategories")
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
    .post("http://94.74.77.165/" + "categories/createCategory", category)
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
    .put("http://94.74.77.165/" + "categories/updateCategory", category)
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
    .post("http://94.74.77.165/" + "categories/deleteCategories", category)
    .then((res) => {
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};