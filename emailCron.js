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
        console.log('no error selling', result)
        // get miotas and sell half, updating totalMiota balance
        let currentTotalMiota = result.totalMiota[result.totalMiota.length - 1]
        let halfOfTotalMiota = Number((currentTotalMiota / 2).toFixed(8))
        result.totalMiota.push(Number(halfOfTotalMiota.toFixed(8)))

        // update cash balance since I just sold some, and update total worth
        let sellingWorth = Number((halfOfTotalMiota * currentPrice).toFixed(2))
        let fee = 0.001
        let binanceProfit = Number((sellingWorth * fee).toFixed(2))
        let realizedCashedOutWorth = Number(( sellingWorth - binanceProfit ).toFixed(2))
        result.cashBalance.push(realizedCashedOutWorth)

        let currentMiotaWorth = sellingWorth + realizedCashedOutWorth
        result.worth = currentMiotaWorth

        // reset environment variables
        cashAvailable = true
        lastPrice = currentPrice
        // result.priceBought = 1.77
        // result.priceSold = 0
        result.priceSold = currentPrice

        result.save(function(err, data) {
          if (err) {
            console.log('Major creation fail');
          } else {
            console.log('********* FINISHED SAVING *********')
          }
        });
      }
    })
  }

  // if (sendIt) {
  //   console.log('sending email', pricesObj)
  //   emailService.sendEmail(pricesObj)
  //   sendIt = false
  //   lastPrice = price
  // }

  // this will run once a week on Friday at 5pm CST and send one email
  let job = new CronJob({
    cronTime: '00 13 05 1-31 1-12 0',
    onTick: scan,
    start: true,
    timeZone: 'America/Los_Angeles'
  });

})();