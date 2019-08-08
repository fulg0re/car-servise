const mongoose = require('mongoose');
const mainConfig = require('../../../config/main');
// const log = require('../../../custom_modules/console-color/console-color');

mongoose.connect(`mongodb://localhost/${mainConfig.DB_NAME}`, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);

/** Connection to DataBase will be global */
global.DataBaseConnection = mongoose.connection;

/** Open connection */
const connect = (callback) => {
  try {
    DataBaseConnection.on('error', console.error.bind(console, 'connection error:'));
    DataBaseConnection.once('open', () => {
      customLog.good('Connected to DB successfully...');
      callback();
    });
  } catch (err) {
    customLog.error(err);
  }
};

module.exports = { connect };
