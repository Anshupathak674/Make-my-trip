const {AirplaneRepository} = require('../repositories')

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data){
    try {
        const result = await airplaneRepository.create(data);
        return result;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    createAirplane
}