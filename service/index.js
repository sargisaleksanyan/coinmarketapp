const updater = require('./updater');

const hours = 24;
const seconds = 60;

module.updateCoin = (function f() {
  updater.updateCryptoCurrencies(() => {
    updater.updateExchangeMarkets();
  });
  setInterval(() => { updater.updateCryptoCurrencies(); }, 30 * seconds * 1000);
  setInterval(() => { updater.updateExchangeMarkets(); }, hours * 60 * seconds * 1000);
})();
