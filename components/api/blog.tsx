import axios from "axios";

export const getBlogsApi = async () => {
  return axios
    .get("http://94.74.77.165/" + "blogs/getBlogs")
    .then((res) => {
      console.log(res)
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

