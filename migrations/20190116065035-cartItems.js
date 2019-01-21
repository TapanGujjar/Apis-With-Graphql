'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("cartItems",{
      id:{
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
        type:Sequelize.INTEGER
      },
      cartId:{
        allowNull:false,
        type:Sequelize.INTEGER,
        references:{
          model:"carts",
          key:"id"
        }
      },
      productId:{
        allowNull:false,
        type:Sequelize.INTEGER,
        references:{
          model:"products",
          key:"id"
        }
      },
      quantity:{
        allowNull:false,
        type:Sequelize.INTEGER,
        defaultValue:1
      },
      createdAt:{
        allowNull:false,
        type:Sequelize.DATE
      },
      updatedAt:{
        allowNull:false,
        type:Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("cartItems")
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
