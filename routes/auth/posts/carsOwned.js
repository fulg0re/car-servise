const R = require('ramda');
const mongoose = require('mongoose');
const UserModel = require('../../../db/mongo/user');
const CarModel = require('../../../db/mongo/car');
const {
  usernameV,
  userExistsV,
  carVinV,
  carExistsV } = require('../../__common__/validator');

/*


    TODO

    move this functionality to different route (not "auth")
    to have token validation



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
    const { username } = req.profile;

    /** Validate postData */
    if ( !usernameV(username)
      || !userExistsV(username)
      || !carVinV(postData.vin)
      || !carExistsV(postData.vin)) {

      /** If validation fail send error response */
      return res.json({
        status: 400,
        error: 'Validation Error!'
      })
    }

    /** Creating new user data */
    let now = new Date();
    let user = await UserModel.findOne({username: username});
    const car = await CarModel.aggregate([
        { $match: { vin: postData.vin } },
        { $project: { _id: 1 } }
      ]);

    let carsOwned = user.cars_owned;
    carsOwned.push(car[0]._id);
    carsOwned = R.uniq(carsOwned);

    user.cars_owned = carsOwned;
    user.updated = now;
    user.updated_by.collection = 'users';
    user.updated_by.id = user._id;

    await user.save();

    return res.json({
      status: 200,
      message: 'Car added as owner'
    });
  } catch (err) {
    customLog.error(err);

    return res.json({
      status: 500,
      message: 'Server error'
    });
  }
};
