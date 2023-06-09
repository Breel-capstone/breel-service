module.exports = (sequelize, Sequelize) => {
  const ProjectMentorship = sequelize.define(
    'ProjectMentorship',
    {
      projectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      mentorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
        onDelete: 'CASCADE',
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
    ProjectMentorship.belongsTo(models.Project, {
      foreignKey: 'projectId',
      as: 'project',
    });
  };

  return ProjectMentorship;
};
