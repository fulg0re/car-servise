// MONGODB sudo systemctl start mongodb
// MONGODB sudo systemctl start mongod
const mongoose = require('mongoose');
const mainConfig = require('./config/main');
const connection = require('./db/mongo/__connection__/index');
const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes');
const { jwtMiddleware } = require('./middlewares/jwt');
global.customLog = require('./__common__/customLog');

const app = express();

// app USEs...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// check token to continue...
app.use(jwtMiddleware);

app.use('/', routes);

/** Connect to mongo DB */
connection.connect(() => {
  app.listen(mainConfig.SERVER_PORT, () => {
    customLog.good(`Server is listening on port - ${mainConfig.SERVER_PORT}`);
  });
});
