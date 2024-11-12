import axios from "axios";

import { StatsByDate } from "../../containers/SuscriptionStats/ISuscrioptionsStats";

export const getStatsByDate = async (date: string) => {
  return axios
    .post('https://gonvar.inowu.dev/subStats', { date })
    .then((res) => {
      // return res;
      // const news: Stats = { mensual_count: 10, cuatri_count: 30, anual_count: 5 }
      // const renewed: Stats = { mensual_count: 5, cuatri_count: 12, anual_count: 3 }
      // const reactive: Stats = { mensual_count: 3, cuatri_count: 10, anual_count: 2 }
      // const canceled: Stats = { mensual_count: 1, cuatri_count: 1, anual_count: 1 }
      // const inactive: Stats = { mensual_count: 5, cuatri_count: 3, anual_count: 1 }
      const stats: StatsByDate = { new: res.data.result.newSubStats, renewed: res.data.result.renewalSubStats, reactive: res.data.result.reactivatedSubStats, canceled: res.data.result.cancelSubStats, inactive: res.data.result.inactiveSubStats }
      return stats;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });

};

export const getStatsByRange = async (startDate: string, endDate: string) => {
  return axios
    .post('https://gonvar.inowu.dev/subStats/range', { startDate, endDate })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const getLastsActive = async () => {
  return axios
    .get('https://gonvar.inowu.dev/activeMemberships')
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const getAllActive = async () => {
  return axios
    .get('https://gonvar.inowu.dev/activeMemberships/all')
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};