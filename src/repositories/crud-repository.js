const {Logger} = require('../config')
class crudRepository{
    constructor(model){
        this.model = model
    }
    async create(data){
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            Logger.error('Something went wrong in crud repo: create');
            throw error;
        }
    }
}
module.exports = crudRepository;