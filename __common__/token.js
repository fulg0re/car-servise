const jwt = require('jsonwebtoken');
const { TOKEN_SECRET, TOKEN_EXPIRES_IN } = require('../config/main');

const createToken = async (data) => {
  return await jwt.sign(data, TOKEN_SECRET, {expiresIn: TOKEN_EXPIRES_IN});
};

const parseToken = async (token) => {
  return await jwt.verify(token, TOKEN_SECRET)
};

module.exports = { createToken, parseToken };