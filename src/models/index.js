'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const customersSchema = require('./customers.schema');
const peopleSchema = require('./people.schema');
const ordersSchema = require('./orders.schema');
const ModelInterface = require('./modelInterface');


// 'postgres://localhost:5432/api-app'
// 'postgres://username:password@localhost:5432/api-app' <-- if you have a username and password
// will use ternary here to set up sqlite for testing
// const DATABASE_URL = process.env.DATABASE_URL;

const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite:memory'
  : process.env.DATABASE_URL;


// instantiate our sequelize connection to our database
let sequelizeDatabase;
if(process.env.NODE_ENV === 'test'){
  sequelizeDatabase = new Sequelize({
    dialect: 'sqlite',
    database: ':memory',
  });
}else {
  sequelizeDatabase = new Sequelize(DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
}


// const sequelizeDatabase = new Sequelize(DATABASE_URL);

// create a customer model with our schema
const CustomerModel = customersSchema(sequelizeDatabase, DataTypes);
// create a people model with our schema
const PeopleModel = peopleSchema(sequelizeDatabase, DataTypes);
// create a orders model with our schema
const OrderModel = ordersSchema(sequelizeDatabase, DataTypes);


// relations added between customer and orders
CustomerModel.hasMany(OrderModel);
OrderModel.belongsTo(CustomerModel);


module.exports = {
  sequelizeDatabase,
  customerInterface: new ModelInterface(CustomerModel),
  orderInterface: new ModelInterface(OrderModel),
  peopleInterface: new ModelInterface(PeopleModel),
};
