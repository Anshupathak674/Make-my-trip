const express = require("express");
const router = express.Router();
const { CityMiddlewares } = require("../../middlewares");
const { CityController } = require("../../controllers");

// /api/v1/airplanes POST
router
  .post("/", CityMiddlewares, CityController.createCity)
  .get("/", CityController.getCities)
  .get("/:id", CityController.getCity);

module.exports = router;
