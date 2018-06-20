/* eslint-disable arrow-body-style,no-shadow,no-await-in-loop,guard-for-in */
// referance https://coinmarketcap.com/api/
// https://api.coinmarketcap.com/v2/ticker/?start=10&sort=id

const axios = require('axios');

const getApiResponse = async (url) => {
  try {
    const res = await axios.get(url);
    return res;
  } catch (e) {
    console.log('url', url);
    return null;
  }
};

const buildUrl = (start) => {
  return `https://api.coinmarketcap.com/v2/ticker/?start=${start}&sort=id`;
};

const getCryptocurrencies = (dataSet) => {
  const cryptoCurrencies = [];
  for (const data in dataSet) {
    const cryptoData = dataSet[data];
    const { quotes, ...main } = cryptoData;
    const crypto = { ...main, ...quotes.USD };
    crypto.currency = 'USD';
    crypto.last_updated = (new Date(crypto.last_updated * 1000)).toISOString();
    cryptoCurrencies.push(crypto);
  }
  return cryptoCurrencies;
};

const scrapCryptocurrencies = async () => {
  let start = 1;
  const size = 100;
  const apiResponse = await getApiResponse(buildUrl(start));
  const cryptoCurrencies = [];

  if (apiResponse || apiResponse.status === 200) {
    const { data } = apiResponse;
    const numCrypto = data.metadata.num_cryptocurrencies;
    const parsedCryptoCurrencies = getCryptocurrencies(data.data);
    cryptoCurrencies.push(...parsedCryptoCurrencies);

    for (let i = size; i < numCrypto / 10; i += size) {
      start += size;
      const apiResponse = await getApiResponse(buildUrl(start));
      const { data } = apiResponse;
      cryptoCurrencies.push(...getCryptocurrencies(data.data));
    }
  }
  return cryptoCurrencies;
};

module.exports = scrapCryptocurrencies;

