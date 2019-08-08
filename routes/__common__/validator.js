const UserModel = require('../../db/mongo/user');
const CarModel = require('../../db/mongo/car');
const consts = require('./consts');

/** Email validation
*
* #mocha test - OK
*/
const emailV = (email) => {
  if (typeof email === 'undefined') return false;

  if (!consts.EMAIL_REGEX.test(String(email).toLowerCase())) {
    console.log(`Validation error (emailV)!`);
    return false;
  }
  return true;
}

/** Username validation
*
* consts.USERNAME_LENGTH_MIN <= username.length <= consts.USERNAME_LENGTH_MAX
*
* #mocha test - OK
*/
const usernameV = (username) => {
  if (typeof username === 'undefined') return false;
  
  if (username.length < consts.USERNAME_LENGTH_MIN 
    || username.length > consts.USERNAME_LENGTH_MAX) {

    console.log(`Validation error (usernameV)!`);
    return false;
  }
  return true;
}

/** Username exists validation
*
* @return false|user._id
*
* #mocha test - SKIPED
*/
const userExistsV = async (username) => {
  const userDataAGG = await UserModel.aggregate([
    { $match: { username: username } },
    { $project: { _id: 1 } },
    { $limit: 1 }
  ]);

  if (userDataAGG.length > 0) {
    return userDataAGG[0]._id;
  }

  return false;
}

/** Password validation
*
* password === confPassword
* consts.PASSWORD_LENGTH_MIN <= username.length <= consts.PASSWORD_LENGTH_MAX
*
* #mocha test - OK
*/
const passwordV = (password, confPassword) => {
  if (typeof password === 'undefined' || typeof confPassword === 'undefined') return false;

  if (password.length < consts.PASSWORD_LENGTH_MIN 
    || password.length > consts.PASSWORD_LENGTH_MAX 
    || password !== confPassword) {

    console.log(`Validation error (passwordV)!`);
    return false;
  }
  return true;
}

/** User FullName validation
*
* consts.USER_FULLNAME_LENGTH_MIN <= userFullName.length <= consts.USER_FULLNAME_LENGTH_MAX
*
* #mocha test - OK
*/
const userFullNameV = (userFullName) => {
  if (typeof userFullName === 'undefined') return false;

  if (userFullName.length < consts.USER_FULLNAME_LENGTH_MIN
    || userFullName.length > consts.USER_FULLNAME_LENGTH_MAX) {

    console.log(`Validation error (userFullNameV)!`);
    return false;
  }
  return true;
}

/** Car name validation
*
* consts.CAR_NAME_LENGTH_MIN <= carName.length <= consts.CAR_NAME_LENGTH_MAX
*
* #mocha test - OK
*/
const carNameV = (carName) => {
  if (typeof carName === 'undefined') return false;
  
  if (carName.length < consts.CAR_NAME_LENGTH_MIN 
    || carName.length > consts.CAR_NAME_LENGTH_MAX) {

    console.log(`Validation error (carNameV)!`);
    return false;
  }
  return true;
}

/** Car vin validation
*
* consts.CAR_VIN_LENGTH === carVin.length
*
* #mocha test - OK
*/
const carVinV = (carVin) => {
  if (typeof carVin === 'undefined') return false;
  
  if (carVin.length !== consts.CAR_VIN_LENGTH) {
    console.log(`Validation error (carVinV)!`);
    return false;
  }
  return true;
}

/** Car exists validation
*
* @return bool
*
* #mocha test - SKIPED
*/
const carExistsV = async (carVin) => {
  const carDataAGG = await CarModel.aggregate([
    { $match: { vin: carVin } }
  ]);

  return (carDataAGG.length > 0) ? true : false;
}

/** Car owner validation
*
* @return false|car._id
*
* #mocha test - SKIPED
*/
const carOwnerV = async (username, carVin) => {
  let result = false;
  let user = await UserModel.aggregate([
      { $match: { username: username } },
      { $project: { _id: 1 } },
      { $limit: 1 }
    ]);

  if (user.length > 0) {
    let userId = user[0]._id;

    let car = await CarModel.aggregate([
        { $match: { $and: [
            { owner: userId },
            { vin: carVin }
          ] } },
        { $project: { _id: 1 } },
        { $limit: 1 }
      ]);

    result = (car.length > 0) ? car[0]._id : false;
  }

  if (!result) console.log(`Validation error (carOwnerV)!`);

  return result;
};

/** Car brend validation
*
* carBrand >>> ONE_OF >>> consts.CAR_BRANDS
*
* #mocha test - OK
*/
const carBrandV = (carBrand) => {
  if (typeof carBrand === 'undefined') return false;
  
  if (consts.CAR_BRANDS.indexOf(carBrand) === -1) {
    console.log(`Validation error (carBrandV)!`);
    return false;
  }
  return true;
}

/** Car model validation
*
* consts.CAR_MODEL_LENGTH_MIN <= carModel.length <= consts.CAR_MODEL_LENGTH_MAX
*
* #mocha test - OK
*/
const carModelV = (carModel) => {
  if (typeof carModel === 'undefined') return false;
  
  if (carModel.length < consts.CAR_MODEL_LENGTH_MIN 
    || carModel.length > consts.CAR_MODEL_LENGTH_MAX) {

    console.log(`Validation error (carModelV)!`);
    return false;
  }
  return true;
}

/** Car type validation
*
* consts.CAR_TYPE_LENGTH_MIN <= carType.length <= consts.CAR_TYPE_LENGTH_MAX
*
* #mocha test - OK
*/
const carTypeV = (carType) => {
  if (typeof carType === 'undefined') return false;
  
  if (carType.length < consts.CAR_TYPE_LENGTH_MIN 
    || carType.length > consts.CAR_TYPE_LENGTH_MAX) {

    console.log(`Validation error (carTypeV)!`);
    return false;
  }
  return true;
}

/** Car fuel type validation
*
* fuelType >>> ONE_OF >>> consts.FUEL_TYPES
*
* #mocha test - OK
*/
const carFuelTypeV = (fuelType) => {
  if (typeof fuelType === 'undefined') return false;
  
  if (consts.FUEL_TYPES.indexOf(fuelType) === -1) {
    console.log(`Validation error (carFuelTypeV)!`);
    return false;
  }
  return true;
}

module.exports = {
  emailV,
  usernameV,
  userExistsV,
  passwordV,
  userFullNameV,
  carNameV,
  carVinV,
  carExistsV,
  carOwnerV,
  carBrandV,
  carModelV,
  carTypeV,
  carFuelTypeV
};