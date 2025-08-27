const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

function validateCityCreate(req, res, next) {
  if (!req.body.name) {
    ErrorResponse.message = "Something went wrong while creating the city";
    ErrorResponse.error = {
      explanation: "Name not found in the incoming request",
    };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateCityCreate,
};
