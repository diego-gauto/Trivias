import axios from "axios";

export const getCoursesApi = async () => {
  return axios
    .get("http://94.74.77.165/" + "courses/getCourses")
    .then((res) => {
      console.log(res)
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const createCoursesApi = async (course: any) => {
  return axios
    .post("http://94.74.77.165/" + "courses/createCourse", course)
    .then((res) => {
      console.log(res)
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const updateCourseApi = async (course: any) => {
  return axios
    .put("http://94.74.77.165/" + "courses/updateCourse", course)
    .then((res) => {
      console.log(res)
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const deleteCourseApi = async (course: any) => {
  return axios
    .put("http://94.74.77.165/" + "courses/updateCourse", course)
    .then((res) => {
      console.log(res)
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};