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
    await queryInterface.bulkInsert('user_project_experience', [
      {
        user_id: '1',
        title: 'SecurePay: Advanced Payment Gateway Integration',
        thumbnail_url: 'https://picsum.photos/id/23/300/300',
        description:
          'Develop a robust payment gateway system with enhanced security features for seamless and secure online transactions.',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: '2',
        title: 'EduQuest: Intelligent Learning Management System',
        thumbnail_url: 'https://picsum.photos/id/28/300/300',
        description:
          'Build an AI-powered platform that optimizes learning experiences by personalizing content, tracking progress, and providing intelligent recommendations.',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: '3',
        title: 'DataShield: Privacy-Enhancing Data Analytics',
        thumbnail_url: 'https://picsum.photos/id/20/300/300',
        description:
          'Design a privacy-focused data analytics solution that ensures data anonymity and confidentiality while extracting valuable insights for businesses.',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: '4',
        title: 'VirtualHealth: Telemedicine and Remote Patient Monitoring',
        thumbnail_url: 'https://picsum.photos/id/17/300/300',
        description:
          'Create a comprehensive telemedicine platform that enables remote consultations, real-time health monitoring, and secure patient data management.',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: '5',
        title: 'SmartHive: IoT-based Home Automation System',
        thumbnail_url: 'https://picsum.photos/id/2/300/300',
        description:
          'Construct an interconnected system that allows users to control home devices, monitor energy consumption, and enhance security through IoT technology.',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: '6',
        title: 'CyberSentry: Advanced Threat Detection and Prevention',
        thumbnail_url: 'https://picsum.photos/id/7/300/300',
        description:
          'Develop a state-of-the-art cybersecurity solution that utilizes machine learning algorithms to proactively detect and mitigate potential threats in real-time.',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: '1',
        title: 'EcoTrack',
        thumbnail_url: 'https://picsum.photos/id/227/300/300',
        description:
          'Mobile app for tracking personal carbon footprint and suggesting eco-friendly alternatives.',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: '2',
        title: 'SmartHomeSec',
        thumbnail_url: 'https://picsum.photos/id/137/300/300',
        description:
          'IoT-based home security system with real-time monitoring and smart alert notifications.',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: '3',
        title: 'EduQuest',
        thumbnail_url: 'https://picsum.photos/id/37/300/300',
        description:
          'Interactive online platform offering personalized learning paths and gamified educational content.',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: '4',
        title: 'HealthTrackr',
        thumbnail_url: 'https://picsum.photos/id/257/300/300',
        description:
          'Wearable device and app for monitoring health vitals and providing personalized wellness recommendations.',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: '5',
        title: 'GreenCity',
        thumbnail_url: 'https://picsum.photos/id/27/300/300',
        description:
          'Urban planning project focused on sustainable development, green spaces, and eco-friendly infrastructure.',
        created_at: '2023-06-06 19:09:11.396+00',
        updated_at: '2023-06-06 19:09:11.396+00',
      },
      {
        user_id: '6',
        title: 'RoboAssist',
        thumbnail_url: 'https://picsum.photos/id/237/300/300',
        description:
          'AI-powered robotic assistant for automating routine tasks and enhancing productivity in the workplace.',
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
