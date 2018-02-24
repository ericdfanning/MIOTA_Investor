const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = Promise
mongoose.connect('mongodb://localhost/MIOTA_Investor');

const bankAccountSchema = new Schema({
  cashBalance: [],
  totalMiota: [],
  priceBought: Number,
  priceSold: Number,
  worth: Number,
  created: Date
});
const BankAccount = mongoose.model('bankAccount', bankAccountSchema);

module.exports = BankAccount