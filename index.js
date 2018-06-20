/* eslint-disable prefer-template */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const dbParamas = require('./config/dbconfig');

const mongoUrl = `${dbParamas.mongoDbLocalUrl}${dbParamas.cryptoCoinCollection}`;
const PORT = process.env.PORT || 3000;
const app = express();
mongoose.connect(mongoUrl, (err) => {
  if (err) {
    throw err;
  }
});

//require('./service/index');


app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','*');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE');
  }
  next();
});
require('./api/routes/index')(app);
app.get('*', (req, res) => {
  //  res.sendFile(__dirname ,"../client/dist/index.html" )
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

app.listen(PORT, (err) => {
  if (!err) {
    console.log('App is running on port ' + PORT);
  }
});

