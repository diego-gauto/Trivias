import axios from "axios";

interface IPrint {
  reward_id: number;
}
export const getRewardsApi = async () => {
  return axios
    .get("https://gonvar.inowu.dev/" + "rewards/getRewards")
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const getPublishedRewardsApi = async () => {
  return axios
    .get("https://gonvar.inowu.dev/" + "rewards/getPublishedRewards")
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const printRequestsType = async (body: IPrint) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "rewards/printRequestsType", body)
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
}
export const createRewardApi = async (reward: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "rewards/createReward", reward)
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const updateRewardApi = async (reward: any) => {
  return axios
    .put("https://gonvar.inowu.dev/" + "rewards/updateReward", reward)
    .then((res) => {
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const deleteRewardApi = async (reward: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "rewards/deleteReward", reward)
    .then((res) => {
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const updateRewardImageApi = async (reward: any) => {
  return axios
    .put("https://gonvar.inowu.dev/" + "rewards/updateRewardImage", reward)
    .then((res) => {
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const getRequestsApi = async () => {
  return axios
    .get("https://gonvar.inowu.dev/" + "rewards/getRequests")
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const getClaimedReward = async (userId: any) => {
  return axios
    .get("https://gonvar.inowu.dev/" + "rewards/getClaimed/" + userId, userId)
    .then((res) => {
      return res.data.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const createRequestApi = async (request: any) => {
  return axios
    .post("https://gonvar.inowu.dev/" + "rewards/createRequest", request)
    .then((res) => {
      return res
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const updateRequestStatusApi = async (request: any) => {
  return axios
    .put("https://gonvar.inowu.dev/" + "rewards/updateRequest", request)
    .then((res) => {
      return res.data.msg
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};
export const getAllRewardDataApi = async (userId: any) => {
  return axios
    .get("https://gonvar.inowu.dev/" + "rewards/getCourse/" + userId, userId)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      console.log(error);
      return error
    });
};