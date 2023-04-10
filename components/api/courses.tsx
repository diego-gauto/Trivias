import axios from "axios";

export const getCoursesApi = async () => {
  return axios
    .get("https://gonvar.inowu.dev/" + "courses/getCourses")
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const createCoursesApi = async (course: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "courses/createCourse", course)
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const updateCourseApi = async (course: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "courses/updateCourse", course)
    .then((res) => {
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const deleteCourseApi = async (course: any) => {
  return axios
    .delete("https://gonvar.inowu.dev/" + "courses/deleteCourse", course)
    .then((res) => {
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const getSingleCourseApi = async (courseId: any) => {
  return axios
    .get("https://gonvar.inowu.dev/" + "courses/" + courseId, courseId)
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
    .get("https://gonvar.inowu.dev/" + "courses/seasons/" + courseId, courseId)
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
    .post("https://gonvar.inowu.dev/" + "courses/createSeason", course)
    .then((res) => {
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const getLessonsFromApi = async (seasons_id: any) => {
  return axios
    .get("https://gonvar.inowu.dev/" + "courses/lessons/" + seasons_id, seasons_id)
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
    .get("https://gonvar.inowu.dev/" + "courses/single/" + lessons_id, lessons_id)
    .then((res) => {
      return res.data.data[0]
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const createLessonFromApi = async (lesson: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "courses/createLesson", lesson)
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const updateLessonFromApi = async (lesson: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "courses/updateLesson", lesson)
    .then((res) => {
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const deleteSeasonFromApi = async (season: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "courses/deleteSeason", season)
    .then((res) => {
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const deleteLessonFromApi = async (lesson: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "courses/deleteLesson", lesson)
    .then((res) => {
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const updateLessonImageFromApi = async (lesson: any) => {
  return axios
    .put("https://gonvar.inowu.dev/" + "courses/updateImage", lesson)
    .then((res) => {
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const updateCourseImageFromApi = async (course: any) => {
  return axios
    .put("https://gonvar.inowu.dev/" + "courses/updateCourseImage", course)
    .then((res) => {
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const updateSeasonNameApi = async (season: any) => {
  return axios
    .put("https://gonvar.inowu.dev/" + "courses/updateSeason", season)
    .then((res) => {
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};