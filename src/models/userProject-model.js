module.exports = (sequelize, Sequelize) => {
  const UserProject = sequelize.define(
    'UserProject',
    {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      thumbnailUrl: {
        type: Sequelize.TEXT,
      },
      description: {
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
      tableName: 'user_project',
      underscored: true,
      timestamps: true,
    },
  );

  UserProject.associate = (models) => {
    UserProject.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return UserProject;
};
