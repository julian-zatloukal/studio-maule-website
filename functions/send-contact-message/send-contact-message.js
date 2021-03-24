const fetch = require('node-fetch');
const sgMail = require('@sendgrid/mail');
const { type } = require('jquery');

/* Use Netlify Enivornment Variables */
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const mailRecipients = ['julianzatm@gmail.com', 'maulegabriella@gmail.com'];
const mailSender = 'contacto@studiomaule.com.ar';

const handler = async (event, context) => {
  try {
    var requestBody = JSON.parse(event.body);

    if (
      requestBody &&
      Object.prototype.hasOwnProperty.call(requestBody, 'body')
    ) {
      requiredParams.forEach(param => {
        if (!Object.prototype.hasOwnProperty.call(requestBody, param)) {
          return {
            statusCode: 400,
            body: JSON.stringify({
              status: 'ERR',
              desc: `Invalid Parameter ${param}`
            })
          };
        }
      });
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({
          status: 'ERR',
          desc: `Invalid parameters`
        })
      };
    }

    var grecaptchaRes = await verifyGoogleRecaptcha(
      reCaptchaSecretKey,
      requestBody['gRecaptchaToken']
    );

    if (
      !Object.prototype.hasOwnProperty.call(grecaptchaRes, 'success') ||
      grecaptchaRes.success !== true
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          status: 'ERR',
          desc: `Invalid Google Recaptcha ${JSON.stringify(grecaptchaRes)}`
        })
      };
    }

    var emailRes = await sendMail(
      requestBody.ipAddress,
      requestBody.timestamp,
      requestBody.subject,
      requestBody.name,
      requestBody.email,
      requestBody.body,
      Object.prototype.hasOwnProperty.call(requestBody, 'phone')
        ? requestBody.phone
        : ''
    );

    if (emailRes.toString().includes('HTTP 202')) {
      return {
        statusCode: 200,
        body: JSON.stringify({ status: 'OK' })
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({
          status: 'ERR',
          desc: `Error. ${emailRes.toString()}`
        })
      };
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

const reCaptchaSecretKey = process.env.GRECAPTCHA_API_KEY;
const requiredParams = [
  'gRecaptchaToken',
  'ipAddress',
  'timestamp',
  'subject',
  'name',
  'email',
  'body'
];

const verifyGoogleRecaptcha = async (secretKey, userToken) => {
  const url = 'https://www.google.com/recaptcha/api/siteverify';
  const params = new URLSearchParams({
    secret: secretKey,
    response: userToken
  });

  var res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  });
  return await res.json();
};

const sendMail = async (
  ipAddress,
  timestamp,
  subject,
  name,
  email,
  body,
  phone
) => {
  /*
    Contact Information
      IP Address
      Timestamp
      Name
      Phone (not required)
      Email
      Body
  */

  const msg = {
    to: mailRecipients,
    from: mailSender,
    subject: 'Información de contacto 🤖',
    text: `Se ha enviado un mensaje desde Studio Maule ✉️\n\nDirección IP: ${ipAddress}\nMarca de tiempo: ${timestamp}\nAsunto: ${subject}\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone ||
      '(No completado)'}\nMensaje:\n\n${body}`,
    html: `Se ha enviado un mensaje desde <strong>Studio Maule</strong> ✉️<br><br><strong>Dirección IP</strong>: ${ipAddress}<br><strong>Marca de tiempo:</strong> ${timestamp}<br><strong>Asunto:</strong> ${subject}<br><strong>Nombre: </strong>${name}<br><strong>Email: </strong>${email}<br><strong>Teléfono: </strong>${phone ||
      '(No completado)'}<br><strong>Mensaje:</strong><br><br>${body}`
  };
  return await sgMail.send(msg);
};

module.exports = { handler };
