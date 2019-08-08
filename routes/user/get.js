// const log = require('../../custom_modules/console-color/console-color');
const UserModel = require('../../db/mongo/user');

module.exports = async (req, res) => {
  try {
    if (!('username' in req.profile)) {
      return res.json({
        status: 400,
        error: 'Username is required'
      })
    }

    const { username } = req.profile;

    let user = await UserModel.aggregate([
      { $match: {username: username} },
      { $project: {
          cars_owned: 0,
          password: 0,
          created: 0,
          created_by: 0,
          updated: 0,
          updated_by: 0,
          __v: 0
        }
      }
    ]);
    customLog.info(`[${new Date()}] >>> User ('_id': '${user._id}') get personal info`);

    return res.json({
      status: 200,
      result: user
    });
  } catch (err) {
    customLog.error(err.stack);
    
    return res.json({
      status: 500,
      error: 'Server Error!'
    });
  }
};
