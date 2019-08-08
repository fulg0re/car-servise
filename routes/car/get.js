const CarModel = require('../../db/mongo/car');
const UserModel = require('../../db/mongo/user');

module.exports = async (req, res) => {
  try {
    if (!('username' in req.profile)) {
      return res.json({
        status: 400,
        error: 'Username is required'
      })
    }

    let { username } = req.profile;

    let userCars = await UserModel.aggregate([
        { $match: {username: username} },
        { $project: { cars_owned: 1 } }
      ]);
    let user = userCars[0];

    let cars = await CarModel.aggregate([
        { $match: {_id: { $in: user.cars_owned } } },
        { $lookup: {
            from: "servise_histories",
            localField: "_id",
            foreignField: "car_id",
            as: "car_history"
          }
        },
        { $project: {
            owner: 0,
            created: 0,
            created_by: 0,
            updated: 0,
            updated_by: 0,
            __v: 0,
            "car_history.created": 0,
            "car_history.created_by": 0,
            "car_history.updated": 0,
            "car_history.updated_by": 0,
            "car_history.__v": 0
          }
        }
      ]);
    customLog.info(`[${new Date()}] >>> User ('_id': '${user._id}') get cars with servise history`);

    return res.json({
      status: 200,
      result: cars
    });
  } catch (err) {
    customLog.error(err.stack);
    
    return res.json({
      status: 500,
      error: 'Server Error!'
    });
  }
};
