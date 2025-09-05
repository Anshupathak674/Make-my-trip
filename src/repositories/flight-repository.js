const { Sequelize } = require("sequelize");
const { Flight, Airplane, Airport, City } = require("../models");
const crudRepository = require("./crud-repository");
const { addRowLockOnFlights } = require("./queries");
const db = require("../models");

class FlightRepository extends crudRepository {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filter, sort) {
    const response = await Flight.findAll({
      where: filter,
      order: sort,
      include: [
        {
          // internally applies joins, left outer join by default
          model: Airplane,
          required: true, // for inner join
          as: "Airplane_Details",
        },
        // {
        //   model: Airport,
        //   required: true,
        //   // this will give null result because by default, it will do inner join like `Flight`.`arrivalAirportId` = `Airport`.`id`
        //   // we have made custom mapping like - `Flight`.`arrivalAirportId` = `Airport`.`code`
        // },
        {
          // internally applies joins, left outer join by default
          model: Airport,
          required: true,
          as: "Departure_Airport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.departureAirportID"),
              "=",
              Sequelize.col("Departure_Airport.code"),
            ),
          },
          include: {
            model: City,
            required: true,
          },
          // line number 32 and 37 should have same alias
        },
        {
          // internally applies joins, left outer join by default
          model: Airport,
          required: true,
          as: "Arrival_Airport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.arrivalAirportID"),
              "=",
              Sequelize.col("Arrival_Airport.code"),
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
      ],
    });
    return response;
  }

  async updateRemainingSeats(flightId, seats, decrease = true) {
    const transaction = await db.sequelize.transaction();
    try {
      await db.sequelize.query(addRowLockOnFlights(flightId));
      const flight = await Flight.findByPk(flightId);
      if (+decrease) {
        // to be revisited
        await flight.decrement(
          "totalSeats",
          { by: seats },
          { transaction: transaction },
        );
      } else {
        await flight.increment(
          "totalSeats",
          { by: seats },
          { transaction: transaction },
        );
      }
      // await flight.save({ transaction: transaction });
      await transaction.commit();
      // const updatedflight = await Flight.findByPk(flightId);
      return flight;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = FlightRepository;
