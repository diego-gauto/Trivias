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

// export const getLastsActive = async () => {
// Datos simulados para probar la tabla
//   const mockData = [
//     {
//       date: '2024-10-01',
//       monthly_conekta: 500,
//       monthly_paypal: 320,
//       monthly_admin: 150,
//       quarterly_conekta: 50,
//       quarterly_paypal: 40,
//       quarterly_admin: 30,
//       quarterly_oxxo: 25,
//       quarterly_spei: 15,
//       yearly_conekta: 10,
//       yearly_paypal: 8,
//       yearly_admin: 5,
//       yearly_oxxo: 3,
//       yearly_spei: 2,
//     },
//     {
//       date: '2024-10-08',
//       monthly_conekta: 550,
//       monthly_paypal: 310,
//       monthly_admin: 160,
//       quarterly_conekta: 52,
//       quarterly_paypal: 42,
//       quarterly_admin: 31,
//       quarterly_oxxo: 27,
//       quarterly_spei: 17,
//       yearly_conekta: 12,
//       yearly_paypal: 7,
//       yearly_admin: 6,
//       yearly_oxxo: 4,
//       yearly_spei: 1,
//     },
//     {
//       date: '2024-10-15',
//       monthly_conekta: 530,
//       monthly_paypal: 300,
//       monthly_admin: 170,
//       quarterly_conekta: 53,
//       quarterly_paypal: 41,
//       quarterly_admin: 32,
//       quarterly_oxxo: 26,
//       quarterly_spei: 18,
//       yearly_conekta: 13,
//       yearly_paypal: 9,
//       yearly_admin: 7,
//       yearly_oxxo: 5,
//       yearly_spei: 3,
//     },
//     {
//       date: '2024-10-22',
//       monthly_conekta: 560,
//       monthly_paypal: 320,
//       monthly_admin: 180,
//       quarterly_conekta: 55,
//       quarterly_paypal: 45,
//       quarterly_admin: 35,
//       quarterly_oxxo: 29,
//       quarterly_spei: 19,
//       yearly_conekta: 15,
//       yearly_paypal: 10,
//       yearly_admin: 8,
//       yearly_oxxo: 6,
//       yearly_spei: 4,
//     },
//   ];

//   axios
//     .get('https://gonvar.inowu.dev/activeMemberships')
//     .then((res) => {
//       console.log(res.data.data);
//     })
//     .catch((error) => {
//       console.log(error);
//       return error;
//     });

//   // Simular un retardo para parecerse a una llamada a la API
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(mockData);
//     }, 1000); // 1 segundo de demora
//   });
// };