const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
function validateAirportCreate(req, res, next) {
  var notFoundParameter;
  if (!req.body.name) {
    notFoundParameter = "Name";
  } else if (!req.body.code) {
    notFoundParameter = "Code";
  } else if (!req.body.cityId) {
    notFoundParameter = "City Id";
  }
  if (notFoundParameter) {
    ErrorResponse.message = "Something went wrong while creating the airport";
    ErrorResponse.error = {
      explanation: `${notFoundParameter} not found in the incoming request`,
    };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateAirportCreate,
};
