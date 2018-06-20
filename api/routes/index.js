const coinRoute = require('./coinRoute');

module.exports = (app) => {
  app.use('/api/coins', coinRoute);
};
