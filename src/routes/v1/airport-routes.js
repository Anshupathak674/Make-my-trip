const express = require("express");
const router = express.Router();
const { AirportMiddlewares } = require("../../middlewares");
const { AirportController } = require("../../controllers");

// /api/v1/airports
router
  .post("/", AirportMiddlewares, AirportController.createAirport)
  .get("/", AirportController.getAirports)
  .get("/:id", AirportController.getAirport);

module.exports = router;
