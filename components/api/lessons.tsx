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

export const getCourseApi = async (courseId: any) => {
  return axios
    .get("http://94.74.77.165/" + "lessons/" + courseId)
    .then((res) => {
      return res.data.data[0]
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const addUserToLessonApi = async (lesson: any) => {
  return axios
    .post("http://94.74.77.165/" + "lessons/add-user", lesson)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const updateUserProgressApi = async (progress: any) => {
  return axios
    .post("http://94.74.77.165/" + "lessons/update-user-progress", progress)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};