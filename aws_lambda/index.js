var AWS = require('aws-sdk');
var ses = new AWS.SES();

const completeUrl = "https://www.google.com";
const axios = require('axios');
const reCapUrl = "https://www.google.com/recaptcha/api/siteverify";
const reCaptchaSecret = "6LfBRdMUAAAAAD3A8bTPcAO-hNfnqp2CElVo7i5Q";

var RECEIVER_SECONDARY = 'julianzatm@gmail.com';
var RECEIVER_PRIMARY = 'maulegabriella@gmail.com';
var SENDER = 'contacto@studiomaule.com.ar';

var response = {
    "isBase64Encoded": false,
    "headers": { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'https://studiomaule.com.ar' },
    "statusCode": 200,
    "body": "{\"result\": \"Success.\"}"
};

var badGoogleRecaptchaBody = "{\"result\": \"Bad Recaptcha response\"}";
var rateLimitPerIPExceededBody = "{\"result\": \"Rate limit exceeded\"}";




exports.handler = async function (event, context) {
    let verifyResult = axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${reCaptchaSecret}&response=${event.grecaptcha_response}`,
        { timeout: 200 },
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
            },
        },
    );

    if (verifyResult.status === 200) { 
        sendEmail(event, function (err, data) {
            context.done(err, null);
        });
    } else{
        response.body = badGoogleRecaptchaBody;
        response.statusCode = 400;
    }

}

function sendEmail(event, done) {
    var params = {
        Destination: {
            ToAddresses: [
                RECEIVER_PRIMARY,
                RECEIVER_SECONDARY
            ]
        },
        Message: {
            Body: {
                Text: {
                    Data: 'IP: ' + event.ip + '\nMarca de tiempo' + event.timestamp + '\n\nNombre: ' + event.name + '\nTelefono: ' + event.phone + '\nEmail: ' + event.email + '\nAsunto: ' + event.subject + '\n\nMensaje: ' + event.desc,
                    Charset: 'UTF-8'
                }
            },
            Subject: {
                Data: 'Contacto cliente',
                Charset: 'UTF-8'
            }
        },
        Source: SENDER
    };
    ses.sendEmail(params, done);
}