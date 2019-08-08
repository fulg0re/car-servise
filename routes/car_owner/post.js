const R = require('ramda');
const UserModel = require('../../db/mongo/user');
const CarModel = require('../../db/mongo/car');
const {
  usernameV,
  userExistsV,
  carVinV,
  carExistsV } = require('../__common__/validator');

module.exports = async (req, res) => {
  try {
    if (!('username' in req.profile)) {
      return res.json({
        status: 400,
        error: 'Username is required'
      })
    }

    const { vin } = req.body;
    const { username } = req.profile;

    /** Validate vin */
    if ( !usernameV(username)
      || !userExistsV(username)
      || !carVinV(vin)
      || !carExistsV(vin)) {

      /** If validation fail send error response */
      return res.json({
        status: 400,
        error: 'Validation Error!'
      })
    }

    /** Creating new user data */
    let user = await UserModel.findOne({username: username});
    let car = await CarModel.findOne({vin: vin});

    if (car.owner !== null) {
      return res.json({
        status: 400,
        error: 'Car is already owned by enother user'
      })
    }

    car.owner = user._id;
    car.updated = new Date();
    car.updated_by = {
      collection: 'users',
      id: user._id
    };
    await car.save();

    let carsOwned = user.cars_owned;
    carsOwned.push(car._id);
    carsOwned = R.uniq(carsOwned);

    user.cars_owned = carsOwned;
    user.updated = new Date();
    user.updated_by = {
      collection: 'users',
      id: user._id
    };
    await user.save();
    customLog.info(`[${new Date()}] >>> Car ('_id': '${car._id}') owner changet ('_id': '${user._id}')`);

    return res.json({
      status: 200,
      message: 'Car owned by user'
    });
  } catch (err) {
    customLog.error(err.stack);

    return res.json({
      status: 500,
      message: 'Server error'
    });
  }
};
