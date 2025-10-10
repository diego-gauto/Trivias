import axios from 'axios';

export const getAllUsersApi = async () => {
  return axios
    .get('https://gonvar.inowu.dev/userTrivia')
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export const userTrivia = async (user: any) => {
  // Simulated behavior for isolated trivia front:
  // - any email will be treated as "first time" (result: true)
  // - the special email 'rechazo@test.com' will simulate a duplicate (result: false)
  try {
    const mail = String(user?.mail || '').toLowerCase();
    const isRejected = mail === 'rechazo@test.com';
    // return a shape similar to axios response used by the rest of the app
    return Promise.resolve({ data: { result: !isRejected } });
  } catch (error) {
    console.log('userTrivia simulation error', error);
    return Promise.resolve({ data: { result: true } });
  }
};
export const emailTrivia = async (user: any) => {
  // Use internal serverless endpoint to send email (this will use nodemailer)
  try {
    const res = await axios.post('/api/sendEmail', user);
    return res;
  } catch (error) {
    console.log('Internal sendEmail failed, falling back to external API', error);
    // Fallback to external endpoint if needed
    try {
      const res2 = await axios.post('https://gonvar.inowu.dev/email', user);
      return res2;
    } catch (err2) {
      console.log('External email send also failed', err2);
      return err2;
    }
  }
};
