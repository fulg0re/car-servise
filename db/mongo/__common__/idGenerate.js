const randomstring = require("randomstring");
const mongoose = require('mongoose');

const IdSchema = mongoose.Schema({
  _id:          { type: String },
  generatedId:  { type: String, unique: true },
  collection_name:  { type: String }
});

const IdModel = mongoose.model('Id', IdSchema);

/** Generate rundom ID for mongodb */
const idGenerate = async (collectionName) => {
  let newId = randomstring.generate({
    length: 33,
    charset: 'alphabetic'
  });

  let findExistId = await IdModel.aggregate([
      { $match: { generatedId: newId } }
    ]);

  if (findExistId.length > 0) {
    return await idGenerate(collectionName);
  } else {
    let newIdModel = new IdModel({
      _id: newId,
      generatedId: newId,
      collection_name: collectionName
    });

    await newIdModel.save();

    return newId;
  }
}

module.exports = { idGenerate };
