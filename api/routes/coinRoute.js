const express = require('express');
const controller = require('../controllers/coinController');

const router = express.Router();

router.post('/', (req, res) => {
  const reqBody = req.body;
  console.log('From ', reqBody);
  const r = JSON.parse(reqBody);
  console.log('From ', r.from);
  console.log('To ', r.to);
  res.status(200).json();
});

module.exports = router;
