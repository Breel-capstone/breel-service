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
    await queryInterface.bulkInsert('user_experience', [
      {
        user_id: 1,
        company_name: 'PT. ABC',
        location: 'Jl Mangga Dua Raya Bl F-2/2, Dki Jakarta',
        title: 'IT Manager',
        start_date: '2014-07-10 12:25:53+00',
        end_date: '2018-12-26 02:27:22+00',
        description:
          'Oversees technology operations, manages IT staff, and ensures effective IT infrastructure and systems for the organization.',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: 2,
        company_name: 'PT. Djarum',
        location: ' Jl Abdul Rahman Saleh 24, Jawa Tengah',
        title: 'Software Engineer',
        start_date: '2016-08-29 08:33:45+00',
        end_date: '2019-04-09 17:36:24+00',
        description:
          'Develops, tests, and maintains software applications and systems to meet business and user requirements.',
        created_at: '2023-06-06 18:09:11.396+00',
        updated_at: '2023-06-06 18:09:11.396+00',
      },
      {
        user_id: 3,
        company_name: 'PT Pertamina (Persero)',
        location: 'Jl Letjen Jamin Ginting 28, Sumatera Utara',
        title: 'Computer Network Architect',
        start_date: '2018-12-07 05:49:04+00',
        end_date: '2019-05-07 21:20:22+00',
        description:
          'Designs and implements secure and efficient computer networks for organizations.',
        created_at: '2023-06-06 17:09:11.396+00',
        updated_at: '2023-06-06 17:09:11.396+00',
      },
      {
        user_id: 4,
        company_name: 'PT PLN (Persero)',
        location: 'Jl Tanah Abang II 8, Dki Jakarta',
        title: 'IT Project Manager',
        start_date: '2016-09-20 08:34:51+00',
        end_date: '2019-12-26 10:16:08+00',
        description:
          'Manages IT projects, coordinates resources, and ensures timely delivery of technology solutions.',
        created_at: '2023-06-06 16:09:11.396+00',
        updated_at: '2023-06-06 16:09:11.396+00',
      },
      {
        user_id: 5,
        company_name: 'PT Telkom Indonesia (Persero) Tbk (TLKM)',
        location: 'Kompl Psr Palmerah Bl B LO-3/28, Dki Jakarta',
        title: 'Web Developer',
        start_date: '2012-06-16 00:32:46+00',
        end_date: '2020-03-09 17:41:39+00',
        description:
          'Designs and develops websites, web applications, and user interfaces using programming languages and web technologies.',
        created_at: '2023-06-06 15:09:11.396+00',
        updated_at: '2023-06-06 15:09:11.396+00',
      },
      {
        user_id: 6,
        company_name: ' PT Indofood Sukses Makmur Tbk',
        location: 'Jl PWS 36, Sumatera Utara',
        title: 'InfoSec Analyst',
        start_date: '2013-11-02 11:34:00+00',
        end_date: '2019-12-28 01:03:12+00',
        description:
          'Designs and codes websites and web applications using programming languages and implements responsive user interfaces.',
        created_at: '2023-06-06 14:09:11.396+00',
        updated_at: '2023-06-06 14:09:11.396+00',
      },
      {
        user_id: 1,
        company_name: 'PT Elang Mahkota Teknologi Tbk ',
        location: 'Jl Perancis Bl F/15, Dki Jakarta',
        title: 'IT Manager',
        start_date: '2021-11-29 05:30:14+00',
        end_date: '2023-05-04 07:15:49+00',
        description:
          'Oversees technology operations, manages IT staff, and ensures effective IT infrastructure and systems for the organization.',
        created_at: '2023-06-06 13:09:11.396+00',
        updated_at: '2023-06-06 13:09:11.396+00',
      },
      {
        user_id: 2,
        company_name: 'Bank Negara Indonesia (Persero), Tbk. (BNI',
        location: 'Jl KH Hasyim Ashari ITC Roxy Mas 48 Lt I, Jakarta',
        title: 'Software Engineer',
        start_date: '2021-02-11 02:23:42+00',
        end_date: '2022-02-01 04:07:27+00',
        description:
          'Develops, tests, and maintains software applications and systems to meet business and user requirements.',
        created_at: '2023-06-06 12:09:11.396+00',
        updated_at: '2023-06-06 12:09:11.396+00',
      },
      {
        user_id: 3,
        company_name: 'PT Bayan Resources Tbk ',
        location: 'Jl Kerinci V/4, Dki Jakarta',
        title: 'Computer Network Architect',
        start_date: '2021-03-02 22:52:13+00',
        end_date: '2022-09-08 05:12:48+00',
        description:
          'Designs and implements secure and efficient computer networks for organizations.',
        created_at: '2023-06-06 11:09:11.396+00',
        updated_at: '2023-06-06 11:09:11.396+00',
      },
      {
        user_id: 4,
        company_name: 'PT Waskita Karya',
        location: 'Jl Pasar Pagi 8, Dki Jakarta',
        title: 'IT Project Manager',
        start_date: '2022-02-16 02:22:58+00',
        end_date: '2022-10-02 08:04:21+00',
        description:
          'Manages IT projects, coordinates resources, and ensures timely delivery of technology solutions.',
        created_at: '2023-06-06 10:09:11.396+00',
        updated_at: '2023-06-06 10:09:11.396+00',
      },
      {
        user_id: 5,
        company_name: 'Indah Kiat Pulp & Paper',
        location: 'Jl Asia Afrika 8 Plaza Senayan, Dki Jakarta',
        title: 'Web Developer',
        start_date: '2021-11-15 14:40:51+00',
        end_date: '2023-03-15 22:44:05+00',
        description:
          'Designs and develops websites, web applications, and user interfaces using programming languages and web technologies.',
        created_at: '2023-06-06 09:09:11.396+00',
        updated_at: '2023-06-06 09:09:11.396+00',
      },
      {
        user_id: 6,
        company_name: 'PT Gudang Garam Tbk (GGRM)',
        location: 'Jl Raya Daan Mogot 10 Meruya UTara, Dki Jakarta',
        title: 'InfoSec Analyst',
        start_date: '2022-06-20 14:22:11+00',
        end_date: '2023-03-11 05:05:52+00',
        description:
          'Designs and codes websites and web applications using programming languages and implements responsive user interfaces.',
        created_at: '2023-06-06 08:09:11.396+00',
        updated_at: '2023-06-06 08:09:11.396+00',
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
