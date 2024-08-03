const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  secret: 'mdm-secret-key',
  port: process.env.PORT,
  connectionString: process.env.CONNECTION_STRING,

  mailService: process.env.MAIL_SERVICE,
  mailHost: process.env.MAIL_HOST,
  mailPort: process.env.MAIL_PORT,
  emailAddress: process.env.EMAIL_ADDRESS,
  emailPassword: process.env.EMAIL_PASSWWORD,
};
