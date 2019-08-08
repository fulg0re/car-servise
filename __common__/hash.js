const bcryptjs = require('bcryptjs');

const hashPassword = async (password) => {
  try {
    let salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
  } catch (err) {
    customLog.error(err);
  }
};

const comparePasswords = (candidatePassword, hashedPassword) => {
  try {
    return bcryptjs.compare(candidatePassword, hashedPassword)
  } catch (err) {
    customLog.error(err);
  }
};

module.exports = { hashPassword, comparePasswords };
