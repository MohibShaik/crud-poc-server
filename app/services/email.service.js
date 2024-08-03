const nodemailer = require('nodemailer');
const config = require('../config/auth.config');
const successresponse = require('../utilities/utils');

async function sendMailNotification(request, template) {
  try {
    // const transporter = nodemailer.createTransport({
    //   host: config.MAIL_HOST,
    //   port: Number(config.MAIL_PORT),
    //   secure: false,
    //   tls: { rejectUnauthorized: false },
    // });

    let htmlBody = template;

    const MAIL_SETTINGS = {
      host: config.mailHost,
      port: config.mailPort,
      secure: true, // secure:true for port 465, secure:false for port 587
      auth: {
        user: config.emailAddress,
        pass: config.emailPassword,
      },
    };

    const nodemailer = require('nodemailer');
    const transporter =
      nodemailer.createTransport(MAIL_SETTINGS);

    const mailOptions = {
      from: config.emailAddress,
      to: request.mailList,
      subject: request?.data.mailSubject,
      html: htmlBody,
    };
    const mailsResponse = await transporter.sendMail(
      mailOptions
    );

    console.log(mailsResponse);

    if (mailsResponse.messageId) {
      return successresponse.successResposeBuilder(
        request,
        mailsResponse,
        200,
        'Mail Sent Successfully'
      );
    }
    if (!mailsResponse.messageId) {
      throw {
        statusCode: 400,
        message: 'Something wrong during mail sending',
      };
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  sendMailNotification: sendMailNotification,
};
