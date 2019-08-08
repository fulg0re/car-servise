// const log = require('../../custom_modules/console-color/console-color');
const UserModel = require('../../db/mongo/user');
const {
  emailV,
  usernameV,
  userExistsV,
  passwordV,
  userFullNameV } = require('../__common__/validator');

/** Update user data without cars_owned */
module.exports = async (req, res) => {
  try {
    const postData = req.body;
    let resStatus = 400;
    let errors = [];

    /** Validate postData */
    if (('email' in postData) && !emailV(postData.email))
      errors.push('Validation Error (email)!');

    if (!(usernameV(postData.username)) || (!(await userExistsV(postData.username))))
      errors.push('Validation Error (username)!');

    if (('newPassword' in postData) && !passwordV(postData.newPassword, postData.newConfPassword))
      errors.push('Validation Error (password)!');

    if (('fullname' in postData) && !userFullNameV(postData.fullname))
      errors.push('Validation Error (fullname)!');

    if (errors.length > 0)
      return res.json({
        status: resStatus,
        error: errors
      })

    /** Update user data */
    let now = new Date();
    let user = await UserModel.findOne({username: postData.username});

    user.password = ('newPassword' in postData) ? postData.newPassword : user.password;
    user.email = ('email' in postData) ? postData.email : user.email;
    user.fullname = ('fullname' in postData) ? postData.fullname : user.fullname;
    user.updated = now;
    user.updated_by.collection = 'users';
    user.updated_by.id = user._id;

    await user.save();

    resStatus = 200;
    return res.json({
      status: resStatus,
      message: 'User updated'
    });
  } catch (err) {
    customLog.error(err);

    return res.json({
      status: 500,
      message: 'Server error'
    });
  }
};
