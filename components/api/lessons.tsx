import axios from "axios";

export const addCourse = async (course: any) => {
  return axios
    .post("http://94.74.77.165/" + "lessons/createCourse", course)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const getCoursesApi = async () => {
  return axios
    .get("http://94.74.77.165/" + "lessons")
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};