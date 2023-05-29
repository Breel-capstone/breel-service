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
    await queryInterface.bulkInsert('project', [
      {
        client_id: 7,
        title: 'Pengembangan Web untuk Main Page Perusahaan',
        description:
          'Proyek ini bertujuan untuk mengembangkan sebuah halaman landing (Landing Page) yang menarik dan fungsional untuk perusahaan. Halaman landing merupakan halaman pertama yang akan dilihat oleh pengunjung ketika mereka mengakses situs web perusahaan. Tujuan dari halaman ini adalah untuk memberikan gambaran yang jelas dan menarik tentang perusahaan, produk, atau layanan yang ditawarkan.',
        duration_month: 1,
        budget: 1000000,
        status: 'Mencari',
        skills: 'Web Development,React JS,HTML/CSS,Responsive,Javascript,Tailwind CSS',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        client_id: 8,
        title: 'Pengembangan Web untuk Main Page Perusahaan',
        description:
          'Proyek ini bertujuan untuk mengembangkan sebuah halaman landing (Landing Page) yang menarik dan fungsional untuk perusahaan. Halaman landing merupakan halaman pertama yang akan dilihat oleh pengunjung ketika mereka mengakses situs web perusahaan. Tujuan dari halaman ini adalah untuk memberikan gambaran yang jelas dan menarik tentang perusahaan, produk, atau layanan yang ditawarkan.',
        duration_month: 1,
        budget: 1000000,
        status: 'Mencari',
        skills: 'Web Development,React JS,HTML/CSS,Responsive,Javascript,Tailwind CSS',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        client_id: 9,
        title: 'Pengembangan Web untuk Main Page Perusahaan',
        description:
          'Proyek ini bertujuan untuk mengembangkan sebuah halaman landing (Landing Page) yang menarik dan fungsional untuk perusahaan. Halaman landing merupakan halaman pertama yang akan dilihat oleh pengunjung ketika mereka mengakses situs web perusahaan. Tujuan dari halaman ini adalah untuk memberikan gambaran yang jelas dan menarik tentang perusahaan, produk, atau layanan yang ditawarkan.',
        duration_month: 1,
        budget: 1000000,
        status: 'Mencari',
        skills: 'Web Development,React JS,HTML/CSS,Responsive,Javascript,Tailwind CSS',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        client_id: 7,
        title: 'Pengembangan Web untuk Main Page Perusahaan',
        description:
          'Proyek ini bertujuan untuk mengembangkan sebuah halaman landing (Landing Page) yang menarik dan fungsional untuk perusahaan. Halaman landing merupakan halaman pertama yang akan dilihat oleh pengunjung ketika mereka mengakses situs web perusahaan. Tujuan dari halaman ini adalah untuk memberikan gambaran yang jelas dan menarik tentang perusahaan, produk, atau layanan yang ditawarkan.',
        duration_month: 1,
        budget: 1000000,
        status: 'Mencari',
        skills: 'Web Development,React JS,HTML/CSS,Responsive,Javascript,Tailwind CSS',
        mentor_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        client_id: 8,
        title: 'Pengembangan Web untuk Main Page Perusahaan',
        description:
          'Proyek ini bertujuan untuk mengembangkan sebuah halaman landing (Landing Page) yang menarik dan fungsional untuk perusahaan. Halaman landing merupakan halaman pertama yang akan dilihat oleh pengunjung ketika mereka mengakses situs web perusahaan. Tujuan dari halaman ini adalah untuk memberikan gambaran yang jelas dan menarik tentang perusahaan, produk, atau layanan yang ditawarkan.',
        duration_month: 1,
        budget: 1000000,
        status: 'Mencari',
        skills: 'Web Development,React JS,HTML/CSS,Responsive,Javascript,Tailwind CSS',
        mentor_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        client_id: 9,
        title: 'Pengembangan Web untuk Main Page Perusahaan',
        description:
          'Proyek ini bertujuan untuk mengembangkan sebuah halaman landing (Landing Page) yang menarik dan fungsional untuk perusahaan. Halaman landing merupakan halaman pertama yang akan dilihat oleh pengunjung ketika mereka mengakses situs web perusahaan. Tujuan dari halaman ini adalah untuk memberikan gambaran yang jelas dan menarik tentang perusahaan, produk, atau layanan yang ditawarkan.',
        duration_month: 1,
        budget: 1000000,
        status: 'Mencari',
        skills: 'Web Development,React JS,HTML/CSS,Responsive,Javascript,Tailwind CSS',
        mentor_id: 6,
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
