import axios from "axios";

import { Stats, StatsByType } from "../../containers/SuscriptionStats/ISuscrioptionsStats";

export const getStatsByDate = async (date: string) => {
  return axios
    .post('https://gonvar.inowu.dev/subStats', { date })
    .then((res) => {
      console.log(res)
      // return res;
      const news: Stats = { month: 10, quarter: 30, anual: 5 }
      const renewed: Stats = { month: 5, quarter: 12, anual: 3 }
      const reactive: Stats = { month: 3, quarter: 10, anual: 2 }
      const canceled: Stats = { month: 1, quarter: 1, anual: 1 }
      const stats: StatsByType = { new: news, renewed: renewed, reactive: reactive, canceled: canceled }
      return stats;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });

};

export const getStatsByRange = async (range: any) => {
  return axios
    .post('https://gonvar.inowu.dev/subStats', range)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};