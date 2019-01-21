'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("orders",{
      id:{
        allowNull:true,
        primaryKey:true,
        autoIncrement:true,
        type:Sequelize.INTEGER
      },
      userId:{
        type:Sequelize.INTEGER,
        references:{
          model:"users",
          key:"id"
        }
      },
      purchasedDate:{
        type:Sequelize.DATE,
        defaultValues:Sequelize.fn("NOW"),
        allowNull:false
      },
      cartId:{
        type:Sequelize.INTEGER,
        unique:true,
        references:{
          model:"carts",
          key:"id"
        }
      }
    })
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("orders")
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
