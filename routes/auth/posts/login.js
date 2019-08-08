const UserModel = require('../../../db/mongo/user');
const { createToken } = require('../../../__common__/token');
const { comparePasswords } = require('../../../__common__/hash');

module.exports = async (req, res) => {
  try {
    const { username, password} = req.body;

    let userData = await UserModel.aggregate([
        { $match: {username} }
      ]);
    let user = userData[0];

    if (userData.length <= 0 || !(await comparePasswords(password, user.password))) {
      return res.json({
        status: 400,
        error: 'Wrong username or password!'
      })
    }
    customLog.info(`[${new Date()}] >>> User logged-in ('_id': '${user._id}')`);

    return res.json({
      status: 200,
      message: 'User logged-in',
      token: await createToken({
        username: user.username,
        email: user.email
      })
    });
  } catch (err) {
    customLog.error(err.stack);

    return res.json({
      status: 500,
      message: 'Server error'
    });
  }
};
