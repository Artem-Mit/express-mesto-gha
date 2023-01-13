const { VALIDATION_ERROR_CODE } = require("../utils/constatnts");

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = VALIDATION_ERROR_CODE;
  }
}

module.exports = ValidationError;
