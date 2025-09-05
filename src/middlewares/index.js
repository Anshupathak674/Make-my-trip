const { validateAirplaneCreate } = require("./airplane-validation");
const { validateAirportCreate } = require("./airport-validation");
const { validateCityCreate } = require("./city-validation");
const {
  validateFlightCreate,
  validateUpdateSeatsRequest,
} = require("./flight-validation");
module.exports = {
  AirplaneMiddlewares: validateAirplaneCreate,
  CityMiddlewares: validateCityCreate,
  AirportMiddlewares: validateAirportCreate,
  FlightCreateMiddleware: validateFlightCreate,
  FlightSeatsUpdateMiddleware: validateUpdateSeatsRequest,
};
