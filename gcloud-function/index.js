/*
    to deploy function to gcloud: npm run deploy
    to test from main function: npm run test
*/


const fetch = require('node-fetch');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(
  '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'
);
const mailRecipients = ['julianzatm@gmail.com', 'maulegabriella@gmail.com'];
const mailSender = 'contacto@studiomaule.com.ar';

const reCaptchaSecretKey = '6LfBRdMUAAAAAD3A8bTPcAO-hNfnqp2CElVo7i5Q';
const requiredParams = [
  'gRecaptchaToken',
  'ipAddress',
  'timestamp',
  'subject',
  'name',
  'email',
  'body',
  'phone'
];

exports.main = async (req, res) => {
  if (req && Object.prototype.hasOwnProperty.call(req, "query")) {
    var params = req.query;
    requiredParams.forEach(param => {
      if (!Object.prototype.hasOwnProperty.call(params, param)) {
        res.status(400).send(`Invalid Parameter ${param}`);
        return;
      }
    });
  } else {
    console.log("Invalid parameters");
    return;
  }

  var grecaptchaRes = await verifyGoogleRecaptcha(
    reCaptchaSecretKey,
    req.query.gRecaptchaToken
  ); 

  if (!Object.prototype.hasOwnProperty.call(grecaptchaRes, "success") || grecaptchaRes.success !== true) {
    res.status(400).send(`Invalid Google Recaptcha ${JSON.stringify(grecaptchaRes)}`);
    return;
  }

  var emailRes = await sendMail(
    req.query.ipAddress,
    req.query.timestamp,
    req.query.subject,
    req.query.name,
    req.query.email,
    req.query.body,
    req.query.phone
  );

  if (emailRes.toString().includes("HTTP 202")) {
    res
    .status(200)
    .send(`Success.`);
  } else {
    res
    .status(400)
    .send(`Error. ${emailRes.toString()}`);
  }
};

const verifyGoogleRecaptcha = async (secretKey, userToken) => {
  const url = 'https://www.google.com/recaptcha/api/siteverify';
  const params = new URLSearchParams();
  params.append('secret', secretKey);
  params.append('response', userToken);

  var res = await fetch(url, {
    method: 'POST',
    body: params
  });
  return res.json();
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