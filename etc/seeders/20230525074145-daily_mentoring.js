'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('daily_mentoring', [
      {
        freelancer_id: 4,
        price: 500_000,
        duration_month: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        freelancer_id: 5,
        price: 1_000_000,
        duration_month: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        freelancer_id: 6,
        price: 750_000,
        duration_month: 2,
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
