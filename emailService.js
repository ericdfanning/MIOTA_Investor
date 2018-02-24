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
  subject: 'IOTA PRICE HAS CHANGED BY A DOLLAR',
};

exports.sendEmail = (pricesObj) => {

  let options = {
    from: mailOptions.from,
    subject: mailOptions.subject,
    to: [''],
    html: template(pricesObj.curPrice, pricesObj.prevPrice),
  }

  transport.sendMail(options, (err, info) => {
    if (err) {
      console.log(`ERROR sending email: ${err}`);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
}