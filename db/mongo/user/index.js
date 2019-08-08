const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  _id:          { type: String },
  username:     { type: String, unique: true },
  password:     { type: String },
  email:        { type: String, unique: true },
  fullname:     { type: String },
  cars_owned:   [ { type: String } ],
  created:      { type: Date },
  updated:      { type: Date, default: null },
  updated_by: {
    collection: { type: String, default: null },
    id:         { type: String, default: null }
  }
});

const UserModel = module.exports = mongoose.model('User', UserSchema);

module.exports.findByQuery = query => UserModel.find(query);
module.exports.findById = id => UserModel.findOne({_id: id});
module.exports.save = newUserModel => newUserModel.save();
