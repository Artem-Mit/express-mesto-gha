const {
  DEFAULT_ERROR,
  DEFAULT_ERROR_MESSAGE,
  ALREADY_EXIST_CODE,
  ALREADY_EXIST_MESSAGE,
} = require("../utils/constatnts");

const errorHandler = (err, req, res, next) => {
  if (err.code === 11000) {
    res.status(ALREADY_EXIST_CODE).send({ message: ALREADY_EXIST_MESSAGE });
    return;
  }
  if (!err.statusCode) {
    next(err);
  } else {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }
  res.status(DEFAULT_ERROR).send({ message: DEFAULT_ERROR_MESSAGE });
};

module.exports = errorHandler;
