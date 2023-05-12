'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('role', [
      {
        name: 'junior freelancer',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'senior freelancer',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'client',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
