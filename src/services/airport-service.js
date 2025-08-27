const { StatusCodes } = require("http-status-codes");
const { AirportRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const airportRepository = new AirportRepository();

async function createAirport(data) {
  try {
    const result = await airportRepository.create(data);
    return result;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      let explanation = [];
      error.errors.array.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    } else if (error.name === "SequelizeForeignKeyConstraintError") {
      console.log(error.fields);
    }
    throw new AppError(
      "Cannot create a new Airport Object",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

async function getAirports() {
  try {
    const airports = await airportRepository.getAll();
    return airports;
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of all the airports",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

async function getAirport(id) {
  try {
    const airport = await airportRepository.get(id);
    return airport;
  } catch (error) {
    if (error.statuscode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The requested airport is not present",
        error.statuscode,
      );
    }
    throw new AppError(
      "Cannot fetch data of the requested airport",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

module.exports = {
  createAirport,
  getAirports,
  getAirport,
};
