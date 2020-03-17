var AWS = require('aws-sdk');
var ses = new AWS.SES();

const completeUrl = "https://www.google.com";
const axios = require('axios');
const reCapUrl = "https://www.google.com/recaptcha/api/siteverify";
const reCaptchaSecret = "<redacted>";

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


    let verifyResult = await axios.post(reCapUrl, {
        secret: reCaptchaSecret,
        response: event.grecaptcha_response
    });


    if (verifyResult.status === 200) {
        sendEmail(event);
        return response;
    } else {
        response.body = badGoogleRecaptchaBody;
        response.statusCode = 400;
        return response;
    }

    

}

function sendEmail(event) {
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
                    Data: 'IP: ' + event.ip + '\nMarca de tiempo: ' + event.timestamp + '\nNombre: ' + event.name + '\nTelefono: ' + event.phone + '\nEmail: ' + event.email + '\nAsunto: ' + event.subject + '\n\nMensaje: ' + event.desc,
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
    ses.sendEmail(params, function (err, data) {
        if (err) {
            console.log(err);
            response.body+=" " + err;
        } else {
            console.log(data);
            response.body+=" " + data;
        }
    });
}