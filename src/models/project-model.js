module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define(
    'Project',
    {
      title: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      durationMonth: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      budget: {
        type: Sequelize.INTEGER,
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
      tableName: 'project',
      underscored: true,
      timestamps: true,
    },
  );

  Project.associate = (models) => {
  };
  return Project;
};
