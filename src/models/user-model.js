module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'User',
    {
      uid: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'role',
          key: 'id',
        },
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      profileUrl: {
        type: Sequelize.TEXT,
      },

      // Utility columns
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
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
      tableName: 'user',
      underscored: true,
      timestamps: true,
    },
  );

  User.associate = (models) => {
    User.belongsTo(models.Role, {
      foreignKey: 'roleId',
      as: 'role',
    });
    User.hasMany(models.UserSkill, {
      foreignKey: 'userId',
      as: 'userSkills',
    });
    User.hasMany(models.UserExperience, {
      foreignKey: 'userId',
      as: 'userExperiences',
    });
    User.hasMany(models.UserProject, {
      foreignKey: 'userId',
      as: 'userProjects',
    });
  };
  return User;
};