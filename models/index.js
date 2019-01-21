// 'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}


const models = {
  User: sequelize.import("./users.js"),
  Address: sequelize.import('./address.js'),
  Product: sequelize.import("./products.js"),
  Cart:sequelize.import("./carts.js"),
  CartItem:sequelize.import("./cartItems.js"),
  Order:sequelize.import("./orders.js")
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});


module.exports ={sequelize,models} 