const mongoose = require('mongoose');
const CarModel = require('../../db/mongo/car');
const ServiseHistoryModel = require('../../db/mongo/servise_history');
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

    let userCars = await UserModel.aggregate([
        { $match: {username: username} },
        { $project: { cars_owned: 1 } }
      ]);

    if (userCars.length <= 0) {
      return res.json({
        status: 400,
        error: 'User do not have cars'
      })
    }

    let serviseHistory = await ServiseHistoryModel.aggregate([
        { $match: { car_id: { $in: userCars[0].cars_owned } } },
        { $project: {
            created: 0,
            created_by: 0,
            updated: 0,
            updated_by: 0,
            __v: 0
          }
        }
      ]);
    customLog.info(`[${new Date()}] >>> User ('_id': '${userCars[0]._id}') get cars servise history`);

    return res.json({
      status: 200,
      result: serviseHistory
    });
  } catch (err) {
    customLog.error(err.stack);
    
    return res.json({
      status: 500,
      error: 'Server Error!'
    });
  }
};
