const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const cityRepository = new CityRepository();

async function createCity(data) {
  try {
    const result = await cityRepository.create(data);
    return result;
  } catch (error) {
    console.log(error);
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }

    throw new AppError(
      "Cannot create a new city",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

async function getCities() {
  try {
    const cities = await cityRepository.getAll();
    return cities;
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of all the cities",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

async function getCity(id) {
  try {
    const city = await cityRepository.get(id);
    return city;
  } catch (error) {
    if (error.statuscode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The details of requested city is not present",
        error.statuscode,
      );
    }
    throw new AppError(
      "Cannot fetch data of the requested city",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

module.exports = {
  createCity,
  getCities,
  getCity,
};
