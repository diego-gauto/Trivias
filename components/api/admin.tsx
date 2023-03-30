import axios from "axios";
import { user } from "firebase-functions/v1/auth";

export const getAdmins = async () => {
  return axios
    .get("http://94.74.77.165/" + "admin/admins")
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
    .put("http://94.74.77.165/" + "admin/update-role", user)
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
    .put("http://94.74.77.165/" + "admin/update-access", data)
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
    .get("http://94.74.77.165/" + "admin/coupons")
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
    .post("http://94.74.77.165/" + "admin/coupons-create", coupon)
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
    .post("http://94.74.77.165/" + "admin/coupons-delete", coupon)
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
    .post("http://94.74.77.165/" + "admin/coupons-update-status", coupon)
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
    .get("http://94.74.77.165/" + "admin/invoices")
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
    .get("http://94.74.77.165/" + "admin/users")
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
    .post("http://94.74.77.165/" + "admin/user-update-info", user)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};