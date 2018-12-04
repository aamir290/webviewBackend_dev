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
    if(process && process.env && process.env.NODE_ENV ==='development'){
      //Dev mod : display message error
      res
        .status(err.status)
        .end(err.message);
    }else{
      //other mod : display only status (security)
      res
        .status(err.status)
        .end();
    }
  } else {
    next(err);
  }
};
