// referance https://coinmarketcap.com/api/
// https://api.coinmarketcap.com/v2/ticker/?start=10&sort=id
const axios = require('axios');


const response = async () => {
  const res = await axios.get('https://api.coinmarketcap.com/v2/ticker/?start=10&sort=id');
  return res;
};

const makeRequest = async () => {
  const res = await response();
  console.log(res);
  return res;
};

//console.log(makeRequest());
makeRequest();
/*
makeRequest().then((res) => {
  console.log(res);
});
*/
