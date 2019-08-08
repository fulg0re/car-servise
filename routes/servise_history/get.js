const mongoose = require('mongoose');
// const log = require('../../custom_modules/console-color/console-color');
const CarModel = require('../../db/mongo/car');
const ServiseHistoryModel = require('../../db/mongo/servise_history');
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

    let userCars = await UserModel.aggregate([
        { $match: {username: reqParams.username} },
        { $project: { cars_owned: 1 } }
      ]);

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
