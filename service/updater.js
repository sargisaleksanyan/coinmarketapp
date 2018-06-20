const cryptoDb = require('../dao/cryptoCurrencyDb');
const cryptoScrapper = require('./scrapper/cryptoScrapper');
const marketScrapper = require('./scrapper/marketScrapper');
const mongoose = require('mongoose');
const dbParamas = require('./../config/dbconfig');

const mongoUrl = `${dbParamas.mongoDbLocalUrl}${dbParamas.cryptoCoinCollection}`;

const service = {};

mongoose.connect(mongoUrl, (err) => {
  if (err) {
    throw err;
  }
});

service.updateCryptoCurrencies = async () => {
  const cryptoCurrencies = await cryptoScrapper();
  cryptoCurrencies.forEach((coin) => {
    cryptoDb.updateCoin(coin);
  });
};

service.updateExchangeMarkets = async () => {
  const cryptoCurrencies = await cryptoDb.getCoinNameId();
  const exchangeMarkets = await marketScrapper(cryptoCurrencies);
  exchangeMarkets.forEach((coin) => {
    cryptoDb.updateMarket(coin);
  });
};

module.exports = service;
service.updateExchangeMarkets();
