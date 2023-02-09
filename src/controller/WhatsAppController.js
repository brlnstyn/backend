var request = require("request");
const express = require('express')

var options = {
  method: 'POST',
  url: 'https://api.ultramsg.com/instance1150/messages/chat',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  form: {
    token: 'Instance_token',
    to: '0895395583578',
    body: 'WhatsApp API on UltraMsg.com works good',
    priority: '10',
    referenceId: ''
  }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

module.exports = options;