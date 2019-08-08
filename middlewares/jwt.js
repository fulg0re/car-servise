const { parseToken } = require('../__common__/token');

const jwtMiddleware = async (req, res, next) => {
  try {
    if (req.url.split('?')[0].split('/')[1] === 'auth') {
      return next();
    }
    if (!('authorization' in req.headers)) {
      return res.json({
        status: 400,
        error: 'Found no token. Token is required!'
      });
    }

    let parsedToken = await parseToken(req.headers.authorization.split(' ')[1]);

    req.profile = {
      username: parsedToken.username,
      email: parsedToken.email };

    next();

  } catch (err) {
    customLog.error(err.stack);

    if (err.name === 'TokenExpiredError') {
      return res.json({
        status: 501,
        error: 'Token expired!'
      });
    }

    return res.json({
      status: 500,
      error: 'Server Error!'
    });
  }
}

module.exports = { jwtMiddleware };