const express = require("express");
const router = express.Router();
const {
  FlightCreateMiddleware,
  FlightSeatsUpdateMiddleware,
} = require("../../middlewares");
const { FlightController } = require("../../controllers");

// /api/v1/flights
router
  .post("/", FlightCreateMiddleware, FlightController.createFlight)
  .get("/", FlightController.getAllFlights)
  .get("/:id", FlightController.getFlight)
  .patch(
    "/:id/seats",
    FlightSeatsUpdateMiddleware,
    FlightController.updateFlightSeats,
  );

module.exports = router;
