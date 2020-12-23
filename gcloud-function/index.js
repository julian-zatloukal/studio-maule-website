/* to deploy function to gcloud: npm run deploy */

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(
  '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'
);

const mailRecipients = ['julianzatm@gmail.com', 'maulegabriella@gmail.com'];
const mailSender = 'contacto@studiomaule.com.ar';

exports.main = (req, res) => {
  sendMail(
    req.query.ipAddress,
    req.query.timestamp,
    req.query.name,
    req.query.email,
    req.query.body,
    req.query.phone
  );
  res.status(200).send('Message Sent!');
};

const sendMail = (ipAddress, timestamp, name, email, body, phone) => {
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
    text: `Se ha enviado un mensaje desde Studio Maule ✉️\n\nDirección IP: ${ipAddress}\nMarca de tiempo: ${timestamp}\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone ||
      '(No completado)'}\nMensaje:\n\n${body}`,
    html: `Se ha enviado un mensaje desde <strong>Studio Maule</strong> ✉️<br><br><strong>Dirección IP</strong>: ${ipAddress}<br><strong>Marca de tiempo:</strong> ${timestamp}<br><strong>Nombre: </strong>${name}<br><strong>Email: </strong>${email}<br><strong>Teléfono: </strong>${phone ||
      '(No completado)'}<br><strong>Mensaje:</strong><br><br>${body}`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch(error => {
      console.error(error);
    });
};
