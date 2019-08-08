// const log = require('../../custom_modules/console-color/console-color');
const CarModel = require('../../db/mongo/car');
const UserModel = require('../../db/mongo/user');
const validator = require('../__common__/validator');
const { idGenerate } = require('../../db/mongo/__common__/idGenerate');

/** 
  req.body = {
    name: String, (10-20 chars)
    vin: String,
    owner(username): String,
    brand: String,
    model: String,
    type: String,
    fuel_type: String
  };
*/
module.exports = async (req, res) => {
  try {
    if (!('username' in req.profile)) {
      return res.json({
        status: 400,
        error: 'Username is required'
      })
    }

    const postData = req.body;

    /** Validate postData */
    if ( !validator.carNameV(postData.name)
      || !validator.carVinV(postData.vin)
      || (await validator.carExistsV(postData.vin))
      || !validator.carBrandV(postData.brand)
      || !validator.carModelV(postData.model)
      || !validator.carTypeV(postData.type)
      || !validator.carFuelTypeV(postData.fuel_type)
      ) {

      /** If validation fail send error response */
      return res.json({
        status: 400,
        error: 'Validation Error!'
      })
    }

    /** Get user ID */
    const userId = await validator.userExistsV(req.profile.username);

    /** If user not exists, return response with error */
    if (!userId) {
      return res.json({
        status: 400,
        error: 'Username dont exists!'
      });
    }
    
    /** Check if Car with 'vin' already exists */
    /** If exists, return response with error */
    if (await validator.carExistsV(postData.vin)) {
      return res.json({
        status: 400,
        error: 'Car with this vin-number already exists!'
      });
    }

    /** Creating new car data */
    let now = new Date();
    let newId = await idGenerate('cars');
    const newCarModel = new CarModel({
      _id: newId,
      name: postData.name,
      vin: postData.vin,
      owner: userId,
      brand: postData.brend,
      model: postData.model,
      type: postData.type,
      fuel_type: postData.fuel_type,
      created: now,
      created_by: {
        collection: 'users',
        id: userId,
      }
    });

    /** Save new user to DB */
    let saveCarResult = await CarModel.save(newCarModel);
    customLog.info(`[${new Date()}] New CAR created ('_id': '${saveCarResult._id}')`);

    let user = await UserModel.findOne({_id: userId});
    user.cars_owned.push(saveCarResult._id);
    await user.save();

    return res.json({
      status: 200,
      message: 'New car created'
    });
  } catch (err) {
    customLog.error(err.stack);
    
    return res.json({
      status: 500,
      error: 'Server Error!'
    });
  }
};
