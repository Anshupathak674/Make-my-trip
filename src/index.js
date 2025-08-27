const express = require("express");

const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");
const { where } = require("sequelize");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);

  //   const { City, Airport } = require("./models");
  //   const bangalore = await City.findByPk(1);
  //   console.log(bangalore);

  //   const kmpAirport = await Airport.create({
  //     name: "Kempegowda Airport",
  //     code: "BLR",
  //     cityId: 1       passing cityId is mandatory coz it shouldn't be null in the table Airport
  //   });

  //   const airport = await bangalore.createAirport({
  //     name: "Hubballi Airport",
  //     code: "HBL",
  //     address: "Bangalore Hubbalii",
  //     // no need of cityId
  //   });
  //   console.log(airport);

  //   const airportsInBLR = await bangalore.getAirports();
  //   console.log(airportsInBLR);
  //   const hublliAirport = await Airport.findByPk(5);
  //   await bangalore.removeAirport(hublliAirport);

  //   const city = await City.findByPk(6);
  //   await city.createAirport({
  //     name: "Indore Airport",
  //     code: "IND",
  //     address: "Madhya Pradesh",
  //   });

  //   await City.destroy({
  //     where: {
  //       id: 6,
  //     },
  //   });
});
