const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
  _id:          { type: String },
  name:         { type: String },
  vin:          { type: String, unique: true, required: true },
  owner:        { type: String, default: null },
  brand:        { type: String },
  model:        { type: String },
  type:         { type: String },
  fuel_type:    { type: String },
  created:      { type: Date },
  updated:      { type: Date, default: null },
  created_by: {
    collection: { type: String, default: null },
    id:         { type: String, default: null }
  },
  updated_by: {
    collection: { type: String, default: null },
    id:         { type: String, default: null }
  }
});

const CarModel = module.exports = mongoose.model('Car', CarSchema);

module.exports.findByQuery = query => CarModel.find(query);
module.exports.findById = id => CarModel.findOne({_id: id});
module.exports.save = newCarModel => newCarModel.save();
