const router = require('express').Router(),
      authPostMiddleware = require('./auth/post'),
      // authPostCarsOwned = require('./auth/postCarsOwned'),
      authGet = require('./auth/get'),
      authPut = require('./auth/put'),
      carPostMiddleware = require('./car/post'),
      carGet = require('./car/get'),
      serviseHistoryPost = require('./servise_history/post'),
      serviseHistoryGet = require('./servise_history/get');

// router.route('/auth/cars_owned')
//   .posts((req, res) => authPostCarsOwned(req, res));

/**
 * type - login|register
 * */
router.route('/auth/:type')
  .post((req, res) => authPostMiddleware(req, res))
  .get((req, res) => authGet(req, res))
  .put((req, res) => authPut(req, res));

/**
 * type - new|owner
 * */
router.route('/car/:type')
  .post((req, res) => carPostMiddleware(req, res))
  .get((req, res) => carGet(req, res));

router.route('/servise_history')
  .post((req, res) => serviseHistoryPost(req, res))
  .get((req, res) => serviseHistoryGet(req, res));

module.exports = router;
