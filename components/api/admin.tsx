import axios from "axios";

export const getAdmins = async () => {
  return axios
    .get("https://gonvar.inowu.dev/" + "admin/admins")
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const updateAdminRole = async (userId: string) => {
  let user = { id: userId }
  return axios
    .put("https://gonvar.inowu.dev/" + "admin/update-role", user)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const updateAdminAccessApi = async (data: any) => {
  return axios
    .put("https://gonvar.inowu.dev/" + "admin/update-access", data)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

// Coupons

export const retrieveCoupons = async () => {
  return axios
    .get("https://gonvar.inowu.dev/" + "admin/coupons")
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const addCouponApi = async (coupon: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "admin/coupons-create", coupon)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const deleteCouponApi = async (coupon: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "admin/coupons-delete", coupon)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const updateCouponStatusApi = async (coupon: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "admin/coupons-update-status", coupon)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

//Invoice

interface InvoicesAxiosReponse {
  invoices: Invoice[],
  count: number
}

export interface Invoice {
  id: number
  amount: number
  method: string
  paid_at: string
  product: string
  user_id: number
  name: string
  email: string
}

export const getInvoicesApi = async () => {
  return axios
    .get<InvoicesAxiosReponse>("https://gonvar.inowu.dev/" + "admin/invoices");
};

export const getInvoicesWithOffsetTestApi = async (body: { offset: number }) => {
  return axios
    .post<InvoicesAxiosReponse>("https://gonvar.inowu.dev/" + "admin/invoices", body);
};

//Users

export const getPartialUsers = async (first: number, second: number) => {
  return axios
    .get("https://gonvar.inowu.dev/" + "admin/partial-users/" + first + "/" + second)
    .then((res) => {
      return res.data.users
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const getAdminUsersApi = async (filters: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "admin/admin-users", filters)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const usersForExcelApi = async (filters: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "admin/admin-users-excel", filters)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const getAllUsers = async (
  limit: number,
  offset: number,
  name: string,
  spent: number,
  level: number,
  method: string,
  state: string,
  country: string,
  date_create_start: string,
  date_create_1: string,
  date_create_2: string,
  date_login_start: string,
  last_login_1: string,
  last_login_2: string,
  course_id: number,
  course_progress: number,
  membership: string,
) => {
  return axios
    .get("https://gonvar.inowu.dev/" + "admin/partial-users-demo/"
      + limit
      + "/" + offset
      + "/" + name
      + "/" + spent
      + "/" + level
      + "/" + method
      + "/" + state
      + "/" + country
      + "/" + date_create_start
      + "/" + date_create_1
      + "/" + date_create_2
      + "/" + date_login_start
      + "/" + last_login_1
      + "/" + last_login_2
      + "/" + course_id
      + "/" + course_progress
      + "/" + membership
    )
    .then((res) => {
      return res.data.users
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const userForExcel = async (
  name: string,
  spent: number,
  level: number,
  method: string,
  state: string,
  country: string,
  date_create_start: string,
  date_create_1: string,
  date_create_2: string,
  date_login_start: string,
  last_login_1: string,
  last_login_2: string,
  course_id: number,
  course_progress: number,
  membership: string,
) => {
  return axios
    .get("https://gonvar.inowu.dev/" + "admin/excel-list/"
      + name
      + "/" + spent
      + "/" + level
      + "/" + method
      + "/" + state
      + "/" + country
      + "/" + date_create_start
      + "/" + date_create_1
      + "/" + date_create_2
      + "/" + date_login_start
      + "/" + last_login_1
      + "/" + last_login_2
      + "/" + course_id
      + "/" + course_progress
      + "/" + membership
    )
    .then((res) => {
      return res.data.sendUsers
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const getProgressForUsers = async (user_id: number) => {
  return axios
    .get("https://gonvar.inowu.dev/" + "admin/course-users/" + user_id)
    .then((res) => {
      return res.data.users
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const getCountriesApi = async () => {
  return axios
    .get("https://gonvar.inowu.dev/" + "admin/get-countries")
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const getMethodsApi = async () => {
  return axios
    .get("https://gonvar.inowu.dev/" + "admin/get-methods")
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const getComeFromApi = async () => {
  return axios
    .get("https://gonvar.inowu.dev/" + "admin/get-comefrom")
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const getCoursesApi = async () => {
  return axios
    .get("https://gonvar.inowu.dev/" + "admin/admin-courses")
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const getLessonFromUserApi = async (userId: any) => {
  return axios
    .get("https://gonvar.inowu.dev/" + "admin/" + userId)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const updateUserInfoApi = async (user: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "admin/user-update-info", user)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const updateCourseMembershipApi = async (user: any) => {
  return axios
    .put("https://gonvar.inowu.dev/" + "users/update-user-courses", user)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const addCourseMembershipApi = async (user: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "users/add-user-courses", user)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const getUserByEmailApi = async (user: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "admin/user", user)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const updateUserRoleApi = async (user: any) => {
  return axios
    .put("https://gonvar.inowu.dev/" + "admin/update-role-user", user)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const getLandingReviewApi = async () => {
  return axios
    .get("https://gonvar.inowu.dev/" + "landing/getLandingReview")
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const createLandingReviewApi = async (user: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "landing/add-landing-review", user)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const updateLandingReviewApi = async (user: any) => {
  return axios
    .put("https://gonvar.inowu.dev/" + "landing/update-landing-review", user)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const getLandingProductApi = async () => {
  return axios
    .get("https://gonvar.inowu.dev/" + "landing/getLandingProducts")
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const createLandingProductApi = async (user: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "landing/add-landing-product", user)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const updateLandingProductApi = async (user: any) => {
  return axios
    .put("https://gonvar.inowu.dev/" + "landing/update-landing-product", user)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};


export interface Comment {
  id: number
  comment: string
  created_at: string
  user_id: number
  lessons_id: number
  course_id: number
  lesson_title: string
  lesson_number: number
  season_number: number
  course_title: string
  season_title: string
  answers: Answer[]
  formatDate: string
}

export interface Answer {
  id: number
  comment: string
  created_at: string
  comments_id: number
  user_id: number
  course_id: number
  comments: CommentOfAnswer[]
}

export interface CommentOfAnswer {
  id: number
  comment: string
  comment_answers_id: number
  user_id: number
  created_at: string
}

export const getComments = async () => {
  return axios
    .get<{ comments: Comment[] }>("https://gonvar.inowu.dev/" + "admin/" + "all/comments");
};

export const deleteCommentAnswers = async (answer: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "admin/" + "delete-comment-answers", answer)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const deleteCommentToAnswers = async (answer: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "admin/" + "delete-comment-answers-comment", answer)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

export const deleteThisComment = async (comment: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "admin/" + "delete-comment", comment)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const cancelReview = async (review: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "admin/create-cancel-review", review)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const getCancelReviewApi = async (limit: number, offset: number, date: string, date_1: string, date_2: string) => {
  let body = {
    limit: limit,
    offset: offset,
    date_status: date,
    date_1: date_1,
    date_2: date_2,
  }
  return axios
    .post("https://gonvar.inowu.dev/" + "admin/cancel/reviews", body)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const cancelReviewExcel = async (date: string, date_1: string, date_2: string) => {
  let body = {
    date_status: date,
    date_1: date_1,
    date_2: date_2,
  }
  return axios
    .post("https://gonvar.inowu.dev/" + "admin/cancel-excel/reviews", body)
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

interface MembershipCloseToEnding {
  id: number;
  name: string;
  last_name: string;
  email: string;
  phone_number: string;
  final_date: string;
  method: string;
  level: number;
  datediff: number;
}

export const getCloseToEndingMembershipUsers = async (levels: number[], startDate: Date, finalDate: Date) => {
  /*Niveles
  Cuatrimestre -> 8
  Mensual -> 6
  Anual -> 5*/
  const body = {
    "levels": levels,
    "start_date": `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`,
    "final_date": `${finalDate.getFullYear()}-${finalDate.getMonth() + 1}-${finalDate.getDate()}`
  }
  return axios
    .post<{ data: MembershipCloseToEnding[] }>("https://gonvar.inowu.dev/" + "admin/get-close-to-ending-membership-users", body)
}

export const getGenericQueryResponse = async (query: string) => {
  const body = {
    query
  }
  return axios.post<{ data: any[] }>("https://gonvar.inowu.dev/" + "admin/generic-mysql-query", body);
}

interface InsertSQLResult {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
}

export const postGenericQueryResponse = async (query: string) => {
  const body = {
    query
  }
  return axios.post<{ data: InsertSQLResult }>("https://gonvar.inowu.dev/" + "admin/generic-mysql-query", body);
}