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
    User.hasMany(models.UserProjectExperience, {
      foreignKey: 'userId',
      as: 'userProjectExperiences',
    });
    User.hasMany(models.Proposal, {
      foreignKey: 'freelancerId',
      as: 'proposals',
    });
    User.hasMany(models.Project, {
      foreignKey: 'clientId',
      as: 'projects',
    });
    User.hasMany(models.ProjectMentorship, {
      foreignKey: 'mentorId',
      as: 'projectMentorships',
    });
    User.hasOne(models.DailyMentoring, {
      foreignKey: 'freelancerId',
      as: 'dailyMentoring',
    });
    User.hasMany(models.DailyMentoringApplicant, {
      foreignKey: 'applicantId',
      as: 'dailyMentoringApplicants',
    });
  };
  return User;
};
