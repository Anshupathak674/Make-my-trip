const { AirportService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
/*
 * POST : /airport
 * req-body: {modelNumber: 'airbus30', capacity: 200}
 */

async function createAirport(req, res) {
  try {
    const airport = await AirportService.createAirport({
      name: req.body.name,
      code: req.body.code,
      address: req.body.address,
      cityId: req.body.cityId,
    });
    SuccessResponse.data = airport;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    // not needed message as we will get from the service
    // ErrorResponse.message = "Something went wrong while creating an airport";
    // console.log(error);
    ErrorResponse.error = error;
    return res.status(error.statuscode).json(ErrorResponse);
  }
}

async function getAirports(req, res) {
  try {
    const airports = await AirportService.getAirports();
    SuccessResponse.data = airports;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statuscode).json(ErrorResponse);
  }
}

async function getAirport(req, res) {
  try {
    const airport = await AirportService.getAirport(req.params.id);
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statuscode).json(ErrorResponse);
  }
}

module.exports = {
  createAirport,
  getAirports,
  getAirport,
};
