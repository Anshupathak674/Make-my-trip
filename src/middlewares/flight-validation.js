const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const compareDates = require("../utils/helpers/datetime-helper");
function validateFlightCreate(req, res, next) {
  var notFoundParameter;
  if (!req.body.flightNumber) {
    notFoundParameter = "Flight Number";
  } else if (!req.body.airplaneId) {
    notFoundParameter = "Airplane Id";
  } else if (!req.body.departureAirportId) {
    notFoundParameter = "Departure Airport Id";
  } else if (!req.body.arrivalAirportId) {
    notFoundParameter = "Arrival Airport Id";
  } else if (!req.body.arrivalTime) {
    notFoundParameter = "Arrival Time";
  } else if (!req.body.departureTime) {
    notFoundParameter = "Departure Time";
  } else if (!req.body.price) {
    notFoundParameter = "Price";
  } else if (!req.body.totalSeats) {
    notFoundParameter = "Total Seats";
  }
  if (notFoundParameter) {
    ErrorResponse.message = "Something went wrong while creating the airport";
    ErrorResponse.error = {
      explanation: `${notFoundParameter} parameter not found in the incoming request`,
    };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!compareDates(req.body.departureTime, req.body.arrivalTime)) {
    ErrorResponse.message = "Something went wrong while creating the airport";
    ErrorResponse.error = {
      explanation: `Departure Time must be lesser than the arrival time`,
    };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

function validateUpdateSeatsRequest(req, res, next) {
  if (!req.body.seats) {
    ErrorResponse.message =
      "Something went wrong while updating seats in the flight";
    ErrorResponse.error = {
      explanation: `No of seats to be incremented or decremented not found in the incoming request`,
    };
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateFlightCreate,
  validateUpdateSeatsRequest,
};
