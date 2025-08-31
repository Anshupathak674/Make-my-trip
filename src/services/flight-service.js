const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const { Op } = require("sequelize");
const AppError = require("../utils/errors/app-error");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      let explanation = [];
      error.errors.array.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new Flight Object",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

async function getAllFlights(query) {
  let customFilters = {};
  let sortFilter = [];
  if (query.trips) {
    [departureAirportId, arrivalAirportId] = query.trips.split("-");
    if (departureAirportId === arrivalAirportId) {
      throw new AppError(
        "Departure and Arrival airports cannot be same",
        StatusCodes.BAD_REQUEST,
      );
    }
    customFilters.departureAirportId = departureAirportId;
    customFilters.arrivalAirportId = arrivalAirportId;
  }
  if (query.price) {
    [minPrice, maxPrice] = query.price.split("-");
    if (minPrice > maxPrice) {
      throw new AppError(
        "Minimum Price cannot be greater than the maximum price",
        StatusCodes.BAD_REQUEST,
      );
    }
    customFilters.price = {
      [Op.between]: [minPrice, maxPrice == undefined ? 20000 : maxPrice],
    };
  }
  if (query.travellers) {
    customFilters.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }
  if (query.tripDate) {
    const endingTripTime = " 23:59:59";
    customFilters.departureTime = {
      [Op.between]: [query.tripDate, query.tripDate + endingTripTime],
    };
  }
  if (query.sort) {
    const params = query.sort.split(",");
    // console.log("Params", params);
    // customFilters.order = [];
    // params.forEach((parameter) => {
    //   const par = parameter.split("_");
    //   console.log("Par", par);
    //   customFilters.order.push(par);
    // });
    // console.log(customFilters);
    const sortFilters = params.map((param) => param.split("_"));
    sortFilter = sortFilters;
    console.log("CustomFilter -", customFilters);
    console.log("SortFilter-", sortFilter);
  }
  try {
    const flights = await flightRepository.getAllFlights(
      customFilters,
      sortFilter,
    );
    return flights;
  } catch (error) {
    throw new AppError(
      "Cannot retrieve the flights",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

async function getFlight(id) {
  try {
    const flight = await flightRepository.get(id);
    return flight;
  } catch (error) {
    if (error.statuscode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The requested flight is not present",
        error.statuscode,
      );
    }
    throw new AppError(
      "Cannot fetch data of the requested flight",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
};
