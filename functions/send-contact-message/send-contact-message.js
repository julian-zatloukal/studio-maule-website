const fetch = require('node-fetch');
const sgMail = require('@sendgrid/mail');


const handler = async (event, context) => {
  return {
    statusCode: 200
  };
};

module.exports = { handler };
