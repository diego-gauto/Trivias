import axios from "axios";
import { IUserHomeworkResponse } from "../../interfaces/IUserHomeworks";
import { IHomeworksByUserResponse } from "../../interfaces/IHomeworkByUser";

export const getHomeworksApi = async () => {
  return axios
    .get("https://gonvar.inowu.dev/" + "homeworks")
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const addHomeworkApi = async (homework: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "homeworks/add-homework", homework)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

// export const getHomeworkUserApi = async (homework: any) => {

//   const CancelToken = axios.CancelToken;
//   const source = CancelToken.source();
//   source.cancel('Cancelling the previous request');
//   return axios
//     .get("https://gonvar.inowu.dev/" + `homeworks/user-homework/lesson/${homework.lessonId}/user/${homework.user_id}`, {
//       cancelToken: source.token,
//     })
//     .then((res) => {
//       console.log(res);

//       return res
//     })
//     .catch((error) => {
//       if (axios.isCancel(error)) {
//         // Request was canceled
//         console.log(error);
//         // return error
//       } else {
//         console.log(error);

//         return error;
//       }
//     });
// };

let cancelTokenSource = axios.CancelToken.source();

interface IHomeworkParams {
  lessonId: number;
  user_id: number;
}

export const getHomeworkUserApi = async (homework: IHomeworkParams) => {
  // If there's an ongoing request, cancel it
  if (cancelTokenSource) {
    cancelTokenSource.cancel('Cancelling the previous request');
  }

  // Create a new cancel token source for the current request
  cancelTokenSource = axios.CancelToken.source();

  try {
    const response = await axios.get<IUserHomeworkResponse>("https://gonvar.inowu.dev/" + `homeworks/user-homework/lesson/${homework.lessonId}/user/${homework.user_id}`, {
      cancelToken: cancelTokenSource.token,
    });

    return response; // Return the data from the API response
  } catch (error) {
    if (error instanceof Error) {
      if (axios.isCancel(error)) {
        // Request was canceled
        console.log("Request was canceled");
      } else {
        // Handle other errors
        console.error("Error:", error);
      }
    }
    throw error;
  }
};

interface IHomeworksByUserParams {
  course_id: number;
  user_id: number;
}

export const getCourseHomeworksOfUser = async (homeworkByUserParamas: IHomeworksByUserParams) => {
  const { user_id, course_id } = homeworkByUserParamas;
  try {
    // user-homeworks/course/:course_id/user/:user_id
    const response = await axios.get<IHomeworksByUserResponse>("https://gonvar.inowu.dev/" + `homeworks/user-homeworks/course/${course_id}/user/${user_id}`, {
      cancelToken: cancelTokenSource.token,
    });

    return response.data; // Return the data from the API response
  } catch (error) {
    if (error instanceof Error) {
      if (axios.isCancel(error)) {
        // Request was canceled
        console.log("Request was canceled");
      } else {
        // Handle other errors
        console.error("Error:", error);
      }
    }
    throw error;
  }
}

export const reviewHomeworkApi = async (homework: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "homeworks/update-homework", homework)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
