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
        uid: 'wRe24YpU8iMF1hXbdImVZ8ubG1U2',
        email: 'test.freelancer.1@gmail.com',
        role_id: 1,
        full_name: 'Test Freelancer 1',
        title: 'Backend Developer',
        profile_url:
          'https://api.dicebear.com/6.x/open-peeps/svg?clothingColor=17231d&skinColor=fdf2f5&seed=test.freelancer.1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uid: 'Ahfl7mUmyGShJ7wPxLtsaHWJTnj1',
        email: 'test.freelancer.2@gmail.com',
        role_id: 1,
        full_name: 'Test Freelancer 2',
        title: 'Frontend Developer',
        profile_url:
          'https://api.dicebear.com/6.x/open-peeps/svg?clothingColor=17231d&skinColor=fdf2f5&seed=test.freelancer.2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uid: 'NCK7vdKAF4SfJwQfT8rdu2JNR8l1',
        email: 'test.freelancer.3@gmail.com',
        role_id: 1,
        full_name: 'Test Freelancer 3',
        title: 'UI/UX Designer',
        profile_url:
          'https://api.dicebear.com/6.x/open-peeps/svg?clothingColor=17231d&skinColor=fdf2f5&seed=test.freelancer.3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uid: '6bHpaLmHSqQDu80sYMdwlE73U5m2',
        email: 'test.mentor.1@gmail.com',
        role_id: 2,
        full_name: 'Test Mentor 1',
        title: 'Backend Developer',
        profile_url:
          'https://api.dicebear.com/6.x/open-peeps/svg?clothingColor=17231d&skinColor=fdf2f5&seed=test.mentor.1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uid: 'E2cyCoEW1dcmC0NGG5O21ZAEcX53',
        email: 'test.mentor.2@gmail.com',
        role_id: 2,
        full_name: 'Test Mentor 2',
        title: 'Frontend Developer',
        profile_url:
          'https://api.dicebear.com/6.x/open-peeps/svg?clothingColor=17231d&skinColor=fdf2f5&seed=test.mentor.2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uid: 'W663vDrI0HPJvlyhmLTfKHEPJCz1',
        email: 'test.mentor.3@gmail.com',
        role_id: 2,
        full_name: 'Test Mentor 3',
        title: 'UI/UX Designer',
        profile_url:
          'https://api.dicebear.com/6.x/open-peeps/svg?clothingColor=17231d&skinColor=fdf2f5&seed=test.mentor.3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uid: '1iv4bjCwQ0hCaYXaO4jqv6oingZ2',
        email: 'test.client.1@gmail.com',
        role_id: 3,
        full_name: 'Test Client 1',
        profile_url:
          'https://api.dicebear.com/6.x/open-peeps/svg?clothingColor=17231d&skinColor=fdf2f5&seed=test.client.1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uid: 'AcMiCsKNjhPxnaeuYqG7lhXCU2r1',
        email: 'test.client.2@gmail.com',
        role_id: 3,
        full_name: 'Test Client 2',
        profile_url:
          'https://api.dicebear.com/6.x/open-peeps/svg?clothingColor=17231d&skinColor=fdf2f5&seed=test.client.2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        uid: 'QtVyjNxOjvUZbsyioNSXwFJC4tD3',
        email: 'test.client.3@gmail.com',
        role_id: 3,
        full_name: 'Test Client 3',
        profile_url:
          'https://api.dicebear.com/6.x/open-peeps/svg?clothingColor=17231d&skinColor=fdf2f5&seed=test.client.3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
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
