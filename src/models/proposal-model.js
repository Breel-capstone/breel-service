module.exports = (sequelize, Sequelize) => {
  const Proposal = sequelize.define(
    'Proposal',
    {
      projectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // TODO: add reference to project table when it's ready
      },
      freelancerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
        onDelete: 'CASCADE',
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
    Proposal.belongsTo(models.Project, {
      foreignKey: 'projectId',
      as: 'project',
    });
    Proposal.belongsTo(models.User, {
      foreignKey: 'freelancerId',
      as: 'freelancer',
    });
  };
  return Proposal;
};
