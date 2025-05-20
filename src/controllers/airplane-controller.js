const { AirplaneService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
/*
 * POST : /airplane
 * req-body: {modelNumber: 'airbus30', capacity: 200}
 */

async function createAirplane(req, res) {
  try {
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    // not needed message as we will get from the service
    // ErrorResponse.message = "Something went wrong while creating an airplane";
    ErrorResponse.error = error;
    return res.status(error.statuscode).json(ErrorResponse);
  }
}

async function getAirplanes(req, res) {
  try {
    const airplanes = await AirplaneService.getAirplanes();
    SuccessResponse.data = airplanes;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statuscode).json(ErrorResponse);
  }
}
module.exports = {
  createAirplane,
};
