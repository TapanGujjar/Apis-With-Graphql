'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("user_address",{
      id:{
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
        type:Sequelize.INTEGER
      },
      address:{
        allowNull:false,
        unique:true,
        type:Sequelize.STRING
      },
      userId:{
        type:Sequelize.INTEGER,
        references:{
          model:"users",
          key:"id"
        }
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
    return queryInterface.dropTable("user_address")
    
  }
};
