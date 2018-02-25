const mailer = require('nodemailer');
const { serviceEmailAddress, password } = require('./email.config');
const template = require('./emailTemplate.js');
let transport = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: serviceEmailAddress,
    pass: password
  }
});

let mailOptions = {
  from: serviceEmailAddress,
  subject: 'Mock IOTA Earnings Report',
};

exports.sendEmail = (balanceObj) => {

  let options = {
    from: mailOptions.from,
    subject: mailOptions.subject,
    to: ['ENTER_EMAIL_YOU_WANT_TO_SEND_IT_TO_HERE'],
    html: template(balanceObj.worth, balanceObj.totalMiota),
  }

  transport.sendMail(options, (err, info) => {
    if (err) {
      console.log(`ERROR sending email: ${err}`);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
}