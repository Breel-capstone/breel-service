module.exports = (sequelize, Sequelize) => {
  const Proposal = sequelize.define(
    'Proposal',
    {
      projectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // TODO: add reference to project table when it's ready
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      durationMonth: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      coverLetter: {
        type: Sequelize.TEXT,
      },
      isApproved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
      tableName: 'proposal',
      underscored: true,
      timestamps: true,
    },
  );

  Proposal.associate = (models) => {
    Proposal.belongsTo(models.Role, {
      foreignKey: 'roleId',
      as: 'role',
    });
    Proposal.hasMany(models.UserSkill, {
      foreignKey: 'userId',
      as: 'userSkills',
    });
    Proposal.hasMany(models.UserExperience, {
      foreignKey: 'userId',
      as: 'userExperiences',
    });
    Proposal.hasMany(models.UserProjectExperience, {
      foreignKey: 'userId',
      as: 'userProjectExperiences',
    });
  };
  return Proposal;
};
