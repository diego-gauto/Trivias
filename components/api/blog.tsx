import axios from "axios";

export const getBlogsApi = async () => {
  return axios
    .get("https://gonvar.inowu.dev/" + "blogs/getBlogs")
    .then((res) => {
      console.log(res)
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

