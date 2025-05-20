const express = require("express");
const router = express.Router();
const { AirplaneMiddlewares } = require("../../middlewares");
const { AirplaneController } = require("../../controllers");

// /api/v1/airplanes POST
router
  .post("/", AirplaneMiddlewares, AirplaneController.createAirplane)
  .get("/", AirplaneController.getAirplanes)
  .get("/:id", AirplaneController.getAirplane);

module.exports = router;
