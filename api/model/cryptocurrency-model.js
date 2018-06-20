const mongoose = require('mongoose');

const { Schema } = mongoose;
const CryptocurrencySchema = new Schema({
  id: { type: Number, index: true, unique: true },
  name: String,
  symbol: String,
  website_slug: String,
  circulating_supply: Number,
  currency: String,
  price: Number,
  market_cap: Number,
  last_updated: Date,
});

module.exports = mongoose.model('cryptocoin', CryptocurrencySchema);
