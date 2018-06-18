const axios = require('axios');

const rp = require('request-promise');
const cheerio = require('cheerio');


const response = async () => {
  const res = await axios.get('https://coinmarketcap.com/currencies/bitcoin/#markets');
  return res;
};

const makeRequest = async () => {
  const htmlContent = await response();
  // console.log(res);
  const cher = cheerio.load(htmlContent.data);
  const marketList = cher('#markets tbody tr');
  return res;
/*  const html = cher.html();
  const market = cher.html('tr.odd:nth-child(1)');
  const market1 = cher.html('#markets tbody tr').val();
  return res;*/
};
makeRequest();