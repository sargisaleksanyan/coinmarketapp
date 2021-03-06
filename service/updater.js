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

service.updateCryptoCurrencies = async (update) => {
  console.log('UpdatingCurrencies');
  const cryptoCurrencies = await cryptoScrapper();
  cryptoCurrencies.forEach((coin) => {
    cryptoDb.updateCoin(coin);
  });
  if (update) {
    update();
  }
};

service.updateExchangeMarkets = async () => {
  console.log('UpdateExchangeMarkets');
  const cryptoCurrencies = await cryptoDb.getCoinNameId();
  const exchangeMarkets = await marketScrapper(cryptoCurrencies);
  console.log('exchangeMarkets.length', exchangeMarkets.length);
  exchangeMarkets.forEach((coin) => {
    cryptoDb.updateMarket(coin);
  });
};

module.exports = service;

