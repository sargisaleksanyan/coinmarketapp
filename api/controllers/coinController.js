const db = require('../../dao/cryptoCurrencyDb');

const controller = {};

controller.queryCoins = async (req, res) => {
  const reqBody = req.body;
  const coins = await db.queryCoins(reqBody);
  res.status(200).json({ coins });
};

controller.getPairs = async (req, res) => {
  const pairs = await db.getPairs();
  res.status(200).json({ pairs });
};

controller.getExchanges = async (req, res) => {
  const exchanges = await db.getExchanges();
  res.status(200).json({ exchanges });
};

module.exports = controller;
