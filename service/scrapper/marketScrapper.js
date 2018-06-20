const axios = require('axios');
const cheerio = require('cheerio');

const requestHtml = async (url) => {
  const res = await axios.get(url);
  return res;
};

const getExchanges = async (url) => {
  const htmlContent = await requestHtml(url);
  const $ = cheerio.load(htmlContent.data);
  const marketElementList = $('#markets tbody tr');
  const marketList = [];
  const marketObject = {};

  for (let i = 0; i < marketElementList.length; i++) {
    const marketElement = marketElementList[i];
    const tr = cheerio.load(marketElement);
    if (tr('td').length === 7) {
      const exchange = tr('td:nth-child(2)>a').text();
      const pairName = tr('td:nth-child(3)>a').text();
      const volume = tr('td:nth-child(4)>span').data('usd');
      const price = tr('td:nth-child(5)>span').data('usd');
      const percent = tr('td:nth-child(6)>span').text();

      if (!marketObject[exchange]) {
        const market = {
          exchangeName: exchange,
          pairs: [],
        };
        marketObject[exchange] = marketList.push(market) - 1;
      }

      const pair = {
        pair: pairName,
        price,
        percent,
        volume,
      };
      marketList[marketObject[exchange]].pairs.push(pair);
    }
  }
  return marketList;
};

/**
 * this funcation scraps markets of given cryptocurrency
 * @param array of cryptocurrencies with id and website_slug
 */
const getAllExchanges = async (cryptocurrencies) => {
  const cryptoMarkets = [];
  // const urlPrefix = https://coinmarketcap.com/currencies/bitcoin/#markets
  const urlPrefix = 'https://coinmarketcap.com/currencies/';
  const urlSuffix = '/#markets';

/*  cryptocurrencies.forEach((crypto) => {
    const url = urlPrefix + crypto.website_slug + urlSuffix;
    const exchangeMarkets = getExchanges(url);
    cryptoMarkets.push({
      exchangeMarkets,
      id: crypto.id,
    });
  });*/

 // cryptocurrencies.forEach((crypto) => {
  for (let i = 0; i < cryptocurrencies.length; i++) {
    const crypto = cryptocurrencies[i];
    const url = urlPrefix + crypto.website_slug + urlSuffix;
    const exchangeMarkets = await getExchanges(url);
    cryptoMarkets.push({
      exchangeMarkets,
      id: crypto.id,
    });
  }

  return cryptoMarkets;
};

module.exports = getAllExchanges;

