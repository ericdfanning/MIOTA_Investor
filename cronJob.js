const CronJob = require('cron').CronJob;
const axios = require('axios');
const BankAccount = require('./schema');
const emailService = require('./emailService');

(function() {

  // var newTransaction = new BankAccount({
  //   cashBalance: [0],
  //   totalMiota: [282],
  //   priceBought: 1.77,
  //   priceSold: 0,
  //   worth: 499.14,
  //   created: new Date()
  // });

  // newTransaction.save(function(err, data) {
  //   if (err) {
  //     console.log('Major creation fail');
  //   } else {
  //     console.log('********* FINISHED SAVING *********')
  //   }
  // });
    
  let priceBought = 0
  let priceSold = 0
  let cashAvailable = false
  let recordHighPrice = 0

  const scan = () => {
    
    BankAccount.findOne({}, (err, result) => {
      if (err) {
        console.log(`FIRST FETCH ERROR: there was an error retrieving previous elements in MongoDB.`)
      } else {
        console.log('no error. FIRST FETCH INFO', result)
        priceBought = result.priceBought
        priceSold = result.priceSold

        let lastPrice = 0
        let pricesObj = {curPrice: 0, prevPrice: 0}
        cashAvailable = result.cashBalance[result.cashBalance.length - 1] !== 0

        axios.get('https://min-api.cryptocompare.com/data/price?fsym=IOT&tsyms=USD')
          .then((res) => {
            let currentPrice = Number(res.data.USD)
            let sendIt = false
            console.log('bought at ', priceBought, '- current is', currentPrice, 'record high price', recordHighPrice)
            if ((currentPrice - 0.10) >= priceBought && !cashAvailable) {
              // then sell half of the miota
              console.log('SELLING HALF OF MIOTA')
              BankAccount.findOne({}, (err, result) => {
                if (err) {
                  console.log(`SELLING ERROR: there was an error retrieving previous elements in MongoDB.`)
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
                  result.priceSold = currentPrice

                  cashAvailable = true
                  lastPrice = currentPrice

                  result.save(function(err, data) {
                    if (err) {
                      console.log('Major creation fail');
                    } else {
                      console.log('********* FINISHED SAVING *********')
                    }
                  });
                }
              })
            } else if ((currentPrice <= lastPrice - 0.10 && cashAvailable) || (currentPrice <= recordHighPrice - 0.10 && cashAvailable))  { /* dropped by certain amount, buy some if I have cash available*/
              console.log('BUYING MIOTA')
              BankAccount.findOne({}, (err, result) => {
                if (err) {
                  console.log(`BUYING ERROR: there was an error retrieving previous elements in MongoDB.`)
                } else {
                  console.log('no error buying', result)
                  // get miotas and sell half, updating totalMiota balance
                  let cashBalance = result.cashBalance[result.cashBalance.length - 1]
                  let currentTotalMiota = result.totalMiota[result.totalMiota.length - 1]
                  let amountOfMiotaICanBuy = Number((cashBalance / currentPrice).toFixed(2))
                  let newMiotaBalance = currentTotalMiota + amountOfMiotaICanBuy
                  result.totalMiota.push(Number(newMiotaBalance.toFixed(8)))
                  result.cashBalance.push(0)

                  let costOfNewMiotaPurchase = amountOfMiotaICanBuy * currentPrice
                  let fee = 0.001
                  let binanceProfit = costOfNewMiotaPurchase * fee
                  let buyingWorth = costOfNewMiotaPurchase - binanceProfit
                  let currentTotalMiotaWorth = currentTotalMiota * currentPrice
                  let newWorth = currentTotalMiotaWorth + buyingWorth
                  result.worth = Number(newWorth.toFixed(2))
                  result.priceBought = currentPrice

                  // reset environment variables
                  cashAvailable = false
                  lastPrice = currentPrice

                  result.save(function(err, data) {
                    if (err) {
                      console.log('Major creation fail');
                    } else {
                      console.log('********* FINISHED SAVING *********')
                    }
                  });
                }
              })
            } else { // recalculate total worth and hold
              console.log('NEITHER BUYING OR SELLING. --- RECALCULATING WORTH')
              BankAccount.findOne({}, (err, result) => {
                if (err) {
                  console.log(`UPDATE WORTH ERROR: there was an error retrieving previous elements in MongoDB.`)
                } else {

                  let currentTotalMiota = result.totalMiota[result.totalMiota.length - 1]
                  let currentTotalMiotaWorth = Number((currentTotalMiota * currentPrice).toFixed(2))
                  let cashBalance = result.cashBalance[result.cashBalance.length - 1]
                  let newWorth = currentTotalMiotaWorth + cashBalance
                  result.worth = Number(newWorth.toFixed(2))

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
          })
        // result.save(function(err, data) {
        //   if (err) {
        //     console.log('Major creation fail');
        //   } else {
        //     console.log('********* FINISHED SAVING *********')
        //   }
        // });
      }
    })
  }

  let job = new CronJob({
    cronTime: '00 * * * * *',
    onTick: scan,
    start: true,
    timeZone: 'America/Los_Angeles'
  });

})();
