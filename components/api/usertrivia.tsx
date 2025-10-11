import axios from 'axios';

// The function getAllUsersApi has been removed as it is not used in the project.

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
    const token = process.env.NEXT_PUBLIC_SEND_EMAILS_TOKEN || '';
    const res = await axios.post('/api/sendEmail', user, {
      headers: {
        'x-send-email-token': token || ''
      }
    });
    return res;
  } catch (error) {
    console.log('Internal sendEmail failed, falling back to external API', error);
    return null;
  }
};
