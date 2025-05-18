const {validateAirplaneCreate} = require('./airplane-validation')
module.exports = {
    AirplaneMiddlewares: validateAirplaneCreate
}