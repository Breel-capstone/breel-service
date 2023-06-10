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

    await queryInterface.bulkInsert('user_skill', [
      {
        user_id: 4,
        skill_name: 'Python',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 2,
        skill_name: 'Cloud Computing',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 3,
        skill_name: 'JavaScript',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 1,
        skill_name: 'Data Analysis',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 5,
        skill_name: 'Java',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 2,
        skill_name: 'Network Security',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 6,
        skill_name: 'Artificial Intelligence',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 3,
        skill_name: 'SQL',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 1,
        skill_name: 'DevOps',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 4,
        skill_name: 'C++',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 6,
        skill_name: 'Machine Learning',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 2,
        skill_name: 'Cybersecurity',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 5,
        skill_name: 'PHP',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 1,
        skill_name: 'Big Data',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 4,
        skill_name: 'Ruby',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 3,
        skill_name: 'Web Development',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 6,
        skill_name: 'Data Science',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 2,
        skill_name: 'C#',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 1,
        skill_name: 'Docker',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 5,
        skill_name: 'Android Development',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 4,
        skill_name: 'JavaScript',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 2,
        skill_name: 'Network Administration',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 6,
        skill_name: 'Python',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 1,
        skill_name: 'SQL',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 5,
        skill_name: 'Cloud Computing',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 3,
        skill_name: 'Java',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 2,
        skill_name: 'C++',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 1,
        skill_name: 'Data Analysis',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 6,
        skill_name: 'DevOps',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 3,
        skill_name: 'Cybersecurity',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 4,
        skill_name: 'Ruby',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
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
