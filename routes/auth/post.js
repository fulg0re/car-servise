const postLoginRoute = require('./posts/login');
const postRegisterRoute = require('./posts/register');
const postCarsOwnedRoute = require('./posts/carsOwned');

module.exports = (req, res, next) => {
  try {
    let postType = req.params.type;
    if (postType === 'login') {
      postLoginRoute(req, res);
    } else
    if (postType === 'register') {
      postRegisterRoute(req, res);
    } else
    if (postType === 'cars_owned') {
      postCarsOwnedRoute(req, res);
    }
  } catch (err) {
    customLog.error(err);

    return res.json({
      status: 500,
      error: 'Server Error!'
    });
  }
}
