const CronJob = require('cron').CronJob;
const axios = require('axios');
const BankAccount = require('./schema');
const emailService = require('./emailService');

(function() {

  const scan = () => {
    BankAccount.findOne({}, (err, result) => {
      if (err) {
        console.log(`EMAIL CRON ERROR: there was an error retrieving previous elements in MongoDB.`)
      } else {
        console.log('no error, sending email', result)

        let obj = {
          worth: result.worth,
          totalMiota: result.totalMiota[result.totalMiota.length - 1]
        }
        
        emailService.sendEmail(obj)
      }
    })
  }

  // this will run once a week on Friday at 5pm CST and send one email
  let job = new CronJob({
    cronTime: '00 13 05 1-31 1-12 0',
    onTick: scan,
    start: true,
    timeZone: 'America/Los_Angeles'
  });

})();