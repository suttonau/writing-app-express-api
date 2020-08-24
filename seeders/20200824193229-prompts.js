'use strict';
const faker = require('faker');
const prompts = [...Array(100)].map(prompt => (
  {
    title: faker.hacker.phrase(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
));

// show seed data
console.log(JSON.stringify(prompts))

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('Prompts', prompts);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
