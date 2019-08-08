const router = require('express').Router(),
      authPostMiddleware = require('./auth/post'),
      carPostMiddleware = require('./car/post'),
      carGet = require('./car/get'),
      carOwnerPost = require('./car_owner/post'),
      serviseHistoryPost = require('./servise_history/post'),
      serviseHistoryGet = require('./servise_history/get'),
      userGet = require('./user/get');
      userPut = require('./user/put');

/**
 * type - login|register
 * */
router.route('/auth/:type')
  .post((req, res) => authPostMiddleware(req, res));

/**
 * type - new|owner
 * */
router.route('/car/:type')
  .post((req, res) => carPostMiddleware(req, res))
  .get((req, res) => carGet(req, res));

router.route('/car_owner')
  .post((req, res) => carOwnerPost(req, res));

router.route('/servise_history')
  .post((req, res) => serviseHistoryPost(req, res))
  .get((req, res) => serviseHistoryGet(req, res));

router.route('/user')
  .get((req, res) => userGet(req, res))
  .put((req, res) => userPut(req, res));

module.exports = router;
