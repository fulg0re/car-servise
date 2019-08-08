const postCreateNewCar = require('./posts/createNewCar');
const postSetCarOwner = require('./posts/setCarOwner');

module.exports = (req, res) => {
  try {
    let postType = req.params.type;
    if (postType === 'new') {
      postCreateNewCar(req, res);
    } else
    if (postType === 'owner') {
      postSetCarOwner(req, res);
    }
  } catch (err) {
    customLog.error(err);

    return res.json({
      status: 500,
      error: 'Server Error!'
    });
  }
};
