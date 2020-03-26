/* eslint-disable no-undef */
var AWS = require('aws-sdk');
var ses = new AWS.SES({region: 'us-east-1'});

const completeUrl = "https://www.google.com";
const axios = require('axios');
const reCapUrl = "https://www.google.com/recaptcha/api/siteverify";
const reCaptchaSecret = "<redacted>";

var RECEIVER_SECONDARY = 'julianzatm@gmail.com';
var RECEIVER_PRIMARY = 'maulegabriella@gmail.com';
var SENDER = 'contacto@studiomaule.com.ar';

var response = {
    isBase64Encoded: false,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'https://studiomaule.com.ar' },
    statusCode: 200,
    body: "success"
};

var badGoogleRecaptchaBody = "Bad Recaptcha response";
var rateLimitPerIPExceededBody = "Rate limit exceeded";

const {parse, stringify} = require('flatted/cjs');




exports.handler = async function (event, context) {


    let verifyResult = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${reCaptchaSecret}&response=${event.grecaptcha_response}`,
        {},
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
            },
        },
    );



    if (verifyResult.data.success == true) {
        await sendEmail(event);
        return response;
    } else {
        response.body = badGoogleRecaptchaBody + '\n ' + verifyResult.data['error-codes'] + stringify(verifyResult);
        response.statusCode = 400;
        return response;
    }
}

async function sendEmail(event) {
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
    var sesResponse = await ses.sendEmail(params).promise();
    //response.body = "SES REPLY: " + stringify(sesResponse);
}