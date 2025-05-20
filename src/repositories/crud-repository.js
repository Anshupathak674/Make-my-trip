const { Logger } = require("../config");
class crudRepository {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    const response = await this.model.create(data);
    return response;
  }

  async destroy(data) {
    const response = await this.model.destroy({
      where: {
        id: data,
      },
    });
    return response;
  }

  async get(data) {
    const response = await this.model.findByPk(data);
    return response;
  }

  async getAll(data) {
    const response = await this.model.findAll();
    return response;
  }
}
module.exports = crudRepository;
