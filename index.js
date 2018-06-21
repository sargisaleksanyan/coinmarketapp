/* eslint-disable prefer-template */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

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

// TODO change
//require('./service/index');


app.use(bodyParser.urlencoded({
  extended: false,
}));

// app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE');
  }
  next();
});

require('./api/routes/index')(app);
/*app.get('*', (req, res) => {
  //  res.sendFile(__dirname ,"../client/dist/index.html" )
  // res.sendFile(path.resolve(__dirname, 'client', 'index.html') );
  res.render('index', { title: 'Express' });
});*/

app.listen(PORT, (err) => {
  if (!err) {
    console.log('App is running on port ' + PORT);
  }
});

