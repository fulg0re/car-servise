const postCarNew = require('./posts/new');
// const postSetCarOwner = require('./posts/setCarOwner');

module.exports = (req, res) => {
  try {
    let postType = req.params.type;
    if (postType === 'new') {
      postCarNew(req, res);
    }
    // else
    // if (postType === 'owner') {
    //   postSetCarOwner(req, res);
    // }
  } catch (err) {
    customLog.error(err.stack);

    return res.json({
      status: 500,
      error: 'Server Error!'
    });
  }
};
