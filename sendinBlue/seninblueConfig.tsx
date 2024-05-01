//SENDINBLUE
let SibApiV3Sdk = require('sib-api-v3-sdk');
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey =
  'y5ZEJzIAnTMpgVdv';
export const sendinblue = () => {
  new SibApiV3Sdk.TransactionalEmailsApi()
    .sendTransacEmail({
      sender: { email: 'sendinblue@sendinblue.com', name: 'Sendinblue' },
      subject: 'This is my default subject line',
      htmlContent:
        '<!DOCTYPE html><html><body><h1>My First Heading</h1><p>My first paragraph.</p></body></html>',
      params: {
        greeting: 'This is the default greeting',
        headline: 'This is the default headline',
      },
      messageVersions: [
        //Definition for Message Version 1
        {
          to: [
            {
              email: 'andreiwoolfolk95@gmail.com',
              name: 'Andrei Woolfolk',
            },
          ],
          htmlContent:
            '<!DOCTYPE html><html><body><h1>Modified header!</h1><p>This is still a paragraph</p></body></html>',
          subject: 'We are happy to be working with you',
        },

        // Definition for Message Version 2
        {
          to: [
            {
              email: 'andreiwoolfolk95@gmail.com',
              name: 'Andrei Woolfolk',
            },
          ],
        },
      ],
    })
    .then(
      function (data: any) {
        console.log(data);
      },
      function (error: any) {
        console.error(error);
      },
    );
};
