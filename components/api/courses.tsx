import axios from "axios";

export const getCoursesApi = async () => {
  return axios
    .get("http://94.74.77.165/" + "courses/getCourses")
    .then((res) => {
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
  console.log(course)
  return axios
    .delete("http://94.74.77.165/" + "courses/deleteCourse", course)
    .then((res) => {
      console.log(res)
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const getSingleCourseApi = async (courseId: any) => {
  return axios
    .get("http://94.74.77.165/" + "courses/" + courseId, courseId)
    .then((res) => {
      return res.data.data[0]
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const getSeasonsFromCourseApi = async (courseId: any) => {
  return axios
    .get("http://94.74.77.165/" + "courses/seasons/" + courseId, courseId)
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const createSeason = async (course: any) => {
  return axios
    .post("http://94.74.77.165/" + "courses/createSeason", course)
    .then((res) => {
      console.log(res)
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const getLessonsFromApi = async (seasons_id: any) => {
  return axios
    .get("http://94.74.77.165/" + "courses/lessons/" + seasons_id, seasons_id)
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const getLessonFromApi = async (lessons_id: any) => {
  return axios
    .get("http://94.74.77.165/" + "courses/single/" + lessons_id, lessons_id)
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const createLessonFromApi = async (lesson: any) => {
  return axios
    .post("http://94.74.77.165/" + "courses/createLesson", lesson)
    .then((res) => {
      console.log(res)
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};