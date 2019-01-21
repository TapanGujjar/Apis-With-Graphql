'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("carts",{
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
      purchased:{
        type:Sequelize.BOOLEAN,
        defaultValues:false,
        allowNull:false
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
    return queryInterface.dropTable("carts")
  }
};
