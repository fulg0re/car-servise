// const log = require('../../custom_modules/console-color/console-color');
const CarModel = require('../../db/mongo/car');
const UserModel = require('../../db/mongo/user');
const ServiseHistoryModel = require('../../db/mongo/servise_history');
const validator = require('../__common__/validator');
const { idGenerate } = require('../../db/mongo/__common__/idGenerate');

module.exports = async (req, res) => {
  try {
    const postData = req.body;

    /** Get user ID */
    const userId = await validator.userExistsV(postData.username);

    /** If user not exists, return response with error */
    if (!userId) {
      return res.json({
        status: 400,
        error: 'Username dont exists!'
      });
    }

    /** Get car ID */
    const carId = await validator.carOwnerV(postData.username, postData.vin);

    /** If not, return response with error */
    if (!carId) {
      return res.json({
        status: 400,
        error: 'Car not found!'
      });
    }

    /** Creating new servise history data for user car */
    let now = new Date();
    let newId = await idGenerate('servise_histories');
    const newServiseHistoryModel = new ServiseHistoryModel({
      _id: newId,
      type: postData.type,
      name: postData.name,
      description: postData.description,
      car_id: carId,
      details: {
        servise_distanse: {
          now: postData.servise_distanse_now,
          next: postData.servise_distanse_next
        },
        servise_date: {
          now: new Date(postData.servise_date_now),
          next: new Date(postData.servise_date_next)
        }
      },
      created: now,
      created_by: {
        collection: 'users',
        id: userId,
      }
    });

    /** Save new user to DB */
    let saveResult = await ServiseHistoryModel.save(newServiseHistoryModel);
    customLog.info(`[${new Date()}] New Servise for Car created ('_id': '${saveResult._id}')`);

    return res.json({
      status: 200,
      message: 'New servise history created'
    });
  } catch (err) {
    customLog.error(err.stack);
    
    return res.json({
      status: 500,
      error: 'Server Error!'
    });
  }
};
