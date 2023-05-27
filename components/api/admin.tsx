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

export const getInvoicesApi = async () => {
  return axios
    .get("https://gonvar.inowu.dev/" + "admin/invoices")
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};

//Users

export const getUsersApi = async () => {
  return axios
    .get("https://gonvar.inowu.dev/" + "admin/users")
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
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
// export const getPartiaDemolUsers = async (first: number, second: number) => {
//   return axios
//     .get("https://gonvar.inowu.dev/" + "admin/partial-users/" + first + "/" + second)
//     .then((res) => {
//       return res.data.users
//     })
//     .catch((error) => {
//       console.log(error);
//       return error
//     });
// };

export const getLessonFromUserApi = async (userId: any) => {
  return axios
    .get("https://gonvar.inowu.dev/" + "admin/" + userId, userId)
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

export const getComments = async () => {
  return axios
    .get("https://gonvar.inowu.dev/" + "admin/" + "all/comments")
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
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