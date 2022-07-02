const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const TWILIO_PHONE_NUMBER = process.env.number;
const sendSms = (phone, message) => {
  const client = require("twilio")(accountSid, authToken);
  client.messages
    .create({
      body: message,
      from: TWILIO_PHONE_NUMBER,
      to: phone,
    })
    .then((message) => console.log(message.sid))
    .catch((error) => console.log(error));
};

module.exports = sendSms;
