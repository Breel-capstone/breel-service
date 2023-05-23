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
    await queryInterface.bulkInsert('user', [
      {
        uid: 'gSaHvu6A0FOwCFvLdo3b8jsWFYy2',
        email: 'c151dsx0967@bangkit.academy',
        role_id: 1,
        full_name: 'Yerobal Gustaf Sekeon C151DSX0967',
        title: 'Backend Developer',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uid: 'gJNeK3Ai4jcco2oWC7T55RzEvpk2',
        email: 'a151dsx2757@bangkit.academy',
        role_id: 2,
        full_name: 'Novel Bafagih A151DSX2757',
        title: 'Frontend Developer',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uid: '9lY8ypo1j0Oya2EVLQnEPqsFyCt1',
        email: 'c181dsx3485@bangkit.academy',
        role_id: 3,
        full_name: 'Emir Muhamad Zaid C181DSX348',
        title: 'Client',
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
