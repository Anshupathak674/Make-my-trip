const { Airport } = require("../models");
const crudRepository = require("./crud-repository");

class AirportRepository extends crudRepository {
  constructor() {
    super(Airport);
  }
}

module.exports = AirportRepository;
