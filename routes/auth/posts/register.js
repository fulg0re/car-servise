const UserModel = require('../../../db/mongo/user');
const { idGenerate } = require('../../../db/mongo/__common__/idGenerate');
const { createToken } = require('../../../__common__/token');
const { hashPassword } = require('../../../__common__/hash');
const {
  emailV,
  usernameV,
  passwordV,
  userFullNameV } = require('../../__common__/validator');

/** 
  req.body = {
    username: String, (5-15 chars)
    password: String, (8-30 chars)
    confPassword: String, ($eq req.body.password)
    email: String,
    fullname: String (10-30 chars)
  };
*/
module.exports = async (req, res) => {
  try {
    const postData = req.body;

    /** Validate postData */
    if ( !emailV(postData.email)
      || !usernameV(postData.username)
      || !passwordV(postData.password, postData.confPassword)
      || !userFullNameV(postData.fullname)) {

      /** If validation fail send error response */
      return res.json({
        status: 400,
        error: 'Validation Error!'
      })
    }

    /** Creating new user data */
    const newUserModel = new UserModel({
      _id: await idGenerate('users'),
      username: postData.username,
      password: await hashPassword(postData.password),
      email: postData.email,
      fullname: postData.fullname,
      cars_owned: [],
      created: new Date()
    });

    /** Save new user to DB */
    let saveResult = await UserModel.save(newUserModel);
    customLog.info(`[${new Date()}] New USER created ('_id': '${saveResult._id}')`);

    return res.json({
      status: 200,
      message: 'New user created',
      token: await createToken({
        username: saveResult.username,
        email: saveResult.email
      })
    });
  } catch (err) {
    customLog.error(err.stack);

    return res.json({
      status: 500,
      message: 'Server error'
    });
  }
};
