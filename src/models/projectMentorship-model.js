module.exports = (sequelize, Sequelize) => {
  const ProjectMentorship = sequelize.define(
    'ProjectMentorship',
    {
      projectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'project',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      mentorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      budgetPercentage: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      restriction: {
        type: Sequelize.TEXT,
      },

      // Utility columns
      createdBy: {
        type: Sequelize.STRING,
      },
      updatedBy: {
        type: Sequelize.STRING,
      },
      deletedBy: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
      tableName: 'project_mentorship',
      underscored: true,
      timestamps: true,
    },
  );

  ProjectMentorship.associate = (models) => {
    ProjectMentorship.belongsTo(models.User, {
      foreignKey: 'mentorId',
      as: 'mentor',
    });
  };

  return ProjectMentorship;
};
