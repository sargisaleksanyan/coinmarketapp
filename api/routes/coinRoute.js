const express = require('express');
const controller = require('../controllers/coinController');
const db = require('../../dao/cryptoCurrencyDb');

const router = express.Router();

const getCoins = async (req, res) => {
  const reqBody = req.body;
  const coins = await db.queryCoins(reqBody);
  res.status(200).json({ coins: coins });
};

router.post('/', (req, res) => {
  getCoins(req, res);
});

module.exports = router;
