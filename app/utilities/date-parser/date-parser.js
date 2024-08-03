const moment = require('moment');

exports.startofDay = (date) => {
  return moment(formatDate(date)).startOf('day');
};

exports.endofDay = (date) => {
  return moment(formatDate(date)).endOf('day');
};

exports.isDate = (date) => {
  return date
    ? new Date(date) !== 'Invalid Date' && !isNaN(new Date(date))
    : false;
};

exports.getFormattedDate = (date) => {
  return formatDate(date);
};

exports.getCurrentDate = () => {
  return moment.utc();
};

function formatDate(date, currentDateFormat = 'DD-MMM-YY') {
  return moment.utc(date, currentDateFormat).format('YYYY-MM-DD');
}
