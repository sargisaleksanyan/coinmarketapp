/* eslint-disable object-property-newline */
const Crypto = require('../api/model/cryptocurrency-model');

const service = {};

const buildQuery = (params) => {
  const query = {};
  const andArray = [];
  const { range } = params;
  const { markets } = params;
  const { pairs } = params;
  if (range) {
    const { from } = range;
    const { to } = range;
    if (from) {
      const fromNumber = parseInt(from);
      const rangeFrom = {
        market_cap: {
          $gte: fromNumber,
        },
      };
      andArray.push(rangeFrom);
    }
    if (to) {
      const fromNumber = parseInt(to);
      const rangeTo = {
        market_cap: {
          $lte: fromNumber,
        },
      };
      andArray.push(rangeTo);
    }
  }

  if (markets) {
    const marketQuery = {};
/*    console.log(typeof markets);
    console.log('Markets', markets);
    const marketArray = JSON.parse(markets);*/
    marketQuery['markets.exchangeName'] = {
      $in: markets,
    };
    andArray.push(marketQuery);
  }

  if (pairs) {
    const pairQuery = {};
    // const pairArray = JSON.parse(pairs);
    pairQuery['markets.pairs.pair'] = {
      $in: pairs,
    };
    andArray.push(pairQuery);
  }
  query.$and = andArray;
  return query;
};


service.queryCoins = async (params) => {
  const query = buildQuery(params);
  const coins = await Crypto.find(query);
  return coins;
};

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
  Crypto.update(
    { id: coinMarket.id },
    {
      $set: {
        markets: coinMarket.exchangeMarkets,
      },
    },
    { strict: false, upsert: true, returnNewDocument: true },
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
