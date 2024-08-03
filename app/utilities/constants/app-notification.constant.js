const NOTIFICATION = (title, body) => 
  `{
 "to": "/topics/entaindelivery",
  "notification": {
    "body": "${body}",
    "title": "${title}",
    "click_action": "FLUTTER_NOTIFICATION_CLICK",
    "sound": "default",
    "badge": 0,
    "alert": "false"
  },
  "data": {
    "click_action": "FLUTTER_NOTIFICATION_CLICK",
    "body": "${body}",
    "title": "${title}",
    "priority": "high",
    "screen": "/Sample",
    "img": "",
    "sound": "default"
  }
} `;


module.exports = { NOTIFICATION };
