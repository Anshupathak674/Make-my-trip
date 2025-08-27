const { validateAirplaneCreate } = require("./airplane-validation");
const { validateAirportCreate } = require("./airport-validation");
const { validateCityCreate } = require("./city-validation");
const { validateFlightCreate } = require("./flight-validation");
module.exports = {
  AirplaneMiddlewares: validateAirplaneCreate,
  CityMiddlewares: validateCityCreate,
  AirportMiddlewares: validateAirportCreate,
  FlightMiddlewares: validateFlightCreate,
};
