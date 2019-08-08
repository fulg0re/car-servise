// const log = require('../../custom_modules/console-color/console-color');
const UserModel = require('../../db/mongo/user');

module.exports = async (req, res) => {
  try {
    let reqParams = req.query;

    if (!('username' in reqParams)) {
      return res.json({
        status: 400,
        error: 'Username is required'
      })
    }

    let user = await UserModel.aggregate([
        { $match: {username: reqParams.username} },
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
