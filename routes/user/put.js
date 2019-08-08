// const log = require('../../custom_modules/console-color/console-color');
const UserModel = require('../../db/mongo/user');
const { hashPassword } = require('../../__common__/hash');
const {
  emailV,
  usernameV,
  userExistsV,
  passwordV,
  userFullNameV } = require('../__common__/validator');

/** Update user data without cars_owned */
module.exports = async (req, res) => {
  try {
    if (!('username' in req.profile)) {
      return res.json({
        status: 400,
        error: 'Username is required'
      })
    }

    const { username } = req.profile;
    const postData = req.body;
    let errors = [];

    /** Validate postData */
    if (('email' in postData) && !emailV(postData.email))
      errors.push('Validation Error (email)!');

    if (!(usernameV(username)) || (!(await userExistsV(username))))
      errors.push('Validation Error (username)!');

    if (('newPassword' in postData) && !passwordV(postData.newPassword, postData.newConfPassword))
      errors.push('Validation Error (password)!');

    if (('fullname' in postData) && !userFullNameV(postData.fullname))
      errors.push('Validation Error (fullname)!');

    if (errors.length > 0)
      return res.json({
        status: 400,
        error: errors
      })

    /** Update user data */
    let user = await UserModel.findOne({username: username});

    user.password = ('newPassword' in postData) ? await hashPassword(postData.newPassword) : user.password;
    user.email = ('email' in postData) ? postData.email : user.email;
    user.fullname = ('fullname' in postData) ? postData.fullname : user.fullname;
    user.updated = new Date();
    user.updated_by.collection = 'users';
    user.updated_by.id = user._id;

    await user.save();
    customLog.info(`[${new Date()}] >>> User ('_id': '${user._id}') updated data`);

    return res.json({
      status: 200,
      message: 'User updated'
    });
  } catch (err) {
    customLog.error(err.stack);

    return res.json({
      status: 500,
      message: 'Server error'
    });
  }
};
