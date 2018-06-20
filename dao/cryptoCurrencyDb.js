/* eslint-disable object-property-newline */
const Crypto = require('../api/model/cryptocurrency-model');

const service = {};

// this funcation updates coin , if it does not exists then inserts.
service.updateCoin = (coin) => {
  Crypto.findOneAndUpdate(
    { id: coin.id },
    {
      $set: {
        name: coin.name, symbol: coin.symbol, website_slug: coin.website_slug,
        circulating_supply: coin.circulating_supply, currency: coin.currency,
        price: coin.price, market_cap: coin.market_cap, last_updated: coin.last_updated,
      },
    },
    { upsert: true, returnNewDocument: true },
  ).catch(() => {
    new Crypto(coin).save();
  });
};
service.updateMarket = (coinMarket) => {
  Crypto.updateOne(
    { id: coinMarket.id },
    {
      $set: {
        markets: coinMarket.exchangeMarkets,
      },
    },
    { upsert: true, returnNewDocument: true },
  ).catch((err) => {
    console.log(err);
  });
};
service.getCoinNameId = async () => {
  const cryptoCoins = await Crypto.find()
    .select('id website_slug')
    .sort({ id: 1 });
  return cryptoCoins;
};

module.exports = service;
