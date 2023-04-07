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
      return res.data.data
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

export const getUserQuizApi = async (quiz: any) => {
  return axios
    .post("http://94.74.77.165/" + "lessons/user-quiz", quiz)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const updateUserProgressByQuizApi = async (progress: any) => {
  return axios
    .post("http://94.74.77.165/" + "lessons/update-user-progress-by-quiz", progress)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const updateUserQuizApi = async (quiz: any) => {
  return axios
    .post("http://94.74.77.165/" + "lessons/update-user-quiz", quiz)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const updateUserScoreApi = async (user: any) => {
  return axios
    .post("http://94.74.77.165/" + "lessons/update-user-score", user)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const getUserCertificateApi = async (ids: any) => {
  return axios
    .get("http://94.74.77.165/" + `lessons/user-certificate/${ids.userId}/${ids.courseId}`)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const addUserCertificateApi = async (certificate: any) => {
  return axios
    .post("http://94.74.77.165/" + `lessons/add-user-certiticate`, certificate)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const addUserHistory = async (history: any) => {
  return axios
    .post("http://94.74.77.165/" + `lessons/add-user-history`, history)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};