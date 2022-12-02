'use strict';

class ModelInterface {
  constructor(model) {
    this.model = model;
  }
  //create
  async create(json) {
    try {
      let record = await this.model.create(json);
      return record;
    } catch (e) {
      console.error('We have a ModelInterface create error', e);
      return e;
    }
  }

  //read
  async read(id = null) {
    try {
      let record;
      if (id) {
        record = await this.model.findOne({ where: { id } });
      } else {
        record = await this.model.findAll();
      }
      return record;
    } catch (e) {
      console.error('we have a ModelInterface read error', e);
      return e;
    }
  }

  //---
  async readManyToOne(id, model) {
    try {
      let record = await this.model.findOne({
        where: { id },
        include: model,
      });
      return record;
    } catch (e) {
      console.error('we have a ModelInterface readManyToOne error', e);
      return e;
    }
  }

  //update
  async update(json, id) {
    try {
      await this.model.update(json, { where: { id } });
      let record = await this.model.findOne({ where: { id } });
      return record;
    } catch (e) {
      console.error('we have a ModelInterface update error', e);
      return e;
    }
  }
  //delete
  async delete(id) {
    try {
      await this.model.destroy({ where: { id } });
      let record = await this.model.findOne({ where: { id } });
      return record;
    } catch (e) {
      console.error('we have a ModelInterface delete error', e);
      return e;
    }
  }
}
module.exports = ModelInterface;
