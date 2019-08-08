const postLoginRoute = require('./posts/login');
const postRegisterRoute = require('./posts/register');

module.exports = (req, res) => {
  try {
    let postType = req.params.type;
    if (postType === 'login') {
      postLoginRoute(req, res);
    } else
    if (postType === 'register') {
      postRegisterRoute(req, res);
    }
  } catch (err) {
    customLog.error(err.stack);

    return res.json({
      status: 500,
      error: 'Server Error!'
    });
  }
};
