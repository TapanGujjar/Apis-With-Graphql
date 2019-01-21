'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('products', [{
      name:"Jackets",
      inventory:1000
    },
    {
      name:"Caps",
      inventory:1000
    },
    {
      name:"Gloves",
      inventory:1000
    }], {});
    /*
    Add altering commands here.
    Return a promise to correctly handle asynchronicity.
    
    Example:
    return queryInterface.bulkInsert('People', [{
      name: 'John Doe',
      isBetaMember: false
    }], {});
    */
  },
  
  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('products', null, {});
    /*
    Add reverting commands here.
    Return a promise to correctly handle asynchronicity.
    
    Example:
    return queryInterface.bulkDelete('People', null, {});
    */
  }
};
