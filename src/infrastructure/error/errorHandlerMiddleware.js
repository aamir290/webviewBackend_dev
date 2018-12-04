/**
 * Handle http error.
 * If not http error, call next error handler.
 * Id dev mod, display error message. Not in production mode.
 * @param err
 * @param req
 * @param res
 * @param next
 */
module.exports = (err, req, res, next) => {
  if (err.status) {
    res
      .status(err.status)
      .end(err.message);
  } else {
    next(err);
  }
};
