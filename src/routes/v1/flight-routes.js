const express = require("express");
const router = express.Router();
const { FlightMiddlewares } = require("../../middlewares");
const { FlightController } = require("../../controllers");

// /api/v1/flights
router
  .post("/", FlightMiddlewares, FlightController.createFlight)
  .get("/", FlightController.getAllFlights);

module.exports = router;
