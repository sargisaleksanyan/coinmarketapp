const express = require('express');
const controller = require('../controllers/coinController');
const router = express.Router();

router.post('/', (req, res) => {
  controller.queryCoins(req, res);
});

router.get('/pairs', (req, res) => {
  controller.getPairs(req, res);
});

router.get('/exchanges', (req, res) => {
  controller.getExchanges(req, res);
});

module.exports = router;
