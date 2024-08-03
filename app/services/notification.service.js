const email = require('./email.service');
const forgotPasswordTemplate = require('../templates/forgotPassword');

async function prepareNotification(req, data) {
  try {
    let template;
    let tempMails;

    if (data?.mailType === 'forgotPassword') {
      template =
        await forgotPasswordTemplate.forgotPasswordTemplate(
          req
        );
      tempMails = req.userEmailAddress;
    }

    const sendEmail = await email.sendMailNotification(
      { mailList: tempMails, data: req },
      template,
      data.mailType
    );

    return 'notification mail sent';
  } catch (error) {
    console.log(error);
  }
}

async function notifyAdmin(payload, notificationType) {
  try {
    const notify = await prepareNotification(payload, {
      mailType: notificationType,
    });

    if (notify == 'notification mail sent') {
      const successResponse = utils.successResposeBuilder(
        payload,
        'Your order has been confirmed',
        200,
        'Your order has been confirmed'
      );
      return successResponse;
    }
  } catch (error) {
    throw error;
  }
}
module.exports = {
  prepareNotification: prepareNotification,
  notifyAdmin: notifyAdmin,
};
