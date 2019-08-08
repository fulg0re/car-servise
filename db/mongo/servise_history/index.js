const mongoose = require('mongoose');

const ServiseHistorySchema = mongoose.Schema({
  _id:          { type: String },
  type:         { type: String },
  name:         { type: String },
  description:  { type: String },
  car_id:       { type: String },
  updated:      { type: Date, default: null },
  created:      { type: Date },
  details: {
    servise_distanse: {
      now:      { type: Number },
      next:     { type: Number }
    },
    servise_date: {
      now:      { type: Date },
      next:     { type: Date }
    }
  },
  created_by: {
    collection: { type: String, default: null },
    id:         { type: String, default: null }
  },
  updated_by: {
    collection: { type: String, default: null },
    id:         { type: String, default: null }
  }
});

const ServiseHistoryModel = module.exports = mongoose.model('servise_history', ServiseHistorySchema);

module.exports.findByQuery = query => ServiseHistoryModel.find(query);
module.exports.findById = id => ServiseHistoryModel.findOne({_id: id});
module.exports.save = newServiseHistoryModel => newServiseHistoryModel.save();
