/*
    to deploy function to gcloud: npm run deploy
    to test from main function: npm run test
*/

const fetch = require('node-fetch');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(
  '<redacted>'
);
const mailRecipients = ['julianzatm@gmail.com', 'maulegabriella@gmail.com'];
const mailSender = 'contacto@studiomaule.com.ar';

const reCaptchaSecretKey = '<redacted>';
const requiredParams = [
  'gRecaptchaToken',
  'ipAddress',
  'timestamp',
  'subject',
  'name',
  'email',
  'body',
];

/* optional parameters: phone */


exports.main = async (req, res) => {
  /* send CORS headers (https://studiomaule.com.ar) */
  res.set('Access-Control-Allow-Origin', '*');
  // res.set('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', '*');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
    return;
  }


  if (req && Object.prototype.hasOwnProperty.call(req, 'query')) {
    var params = req.query;
    requiredParams.forEach(param => {
      if (!Object.prototype.hasOwnProperty.call(params, param)) {
        res.status(400).send(`Invalid Parameter ${param}`);
        return;
      }
    });
  } else {
    console.log('Invalid parameters');
    return;
  }

  var grecaptchaRes = await verifyGoogleRecaptcha(
    reCaptchaSecretKey,
    req.query.gRecaptchaToken
  );

  if (
    !Object.prototype.hasOwnProperty.call(grecaptchaRes, 'success') ||
    grecaptchaRes.success !== true
  ) {
    res
      .status(400)
      .send(`Invalid Google Recaptcha ${JSON.stringify(grecaptchaRes)}`);
    return;
  }

  var emailRes = await sendMail(
    req.query.ipAddress,
    req.query.timestamp,
    req.query.subject,
    req.query.name,
    req.query.email,
    req.query.body,
    Object.prototype.hasOwnProperty.call(req.query, 'phone') ? req.query.phone : ""
  );

  if (emailRes.toString().includes('HTTP 202')) {
    res.status(200).send(`Success.`);
  } else {
    res.status(400).send(`Error. ${emailRes.toString()}`);
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
