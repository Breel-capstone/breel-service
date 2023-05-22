module.exports = (sequelize, Sequelize) => {
  const Proposal = sequelize.define(
    'Proposal',
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
      status: {
        type: Sequelize.ENUM('Pending', 'Accepted', 'Rejected'),
        defaultValue: 'Pending',
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
    Proposal.belongsTo(models.User, {
      foreignKey: 'freelancerId',
      as: 'freelancer',
    });
    Proposal.belongsTo(models.Project, {
      foreignKey: 'projectId',
      as: 'project',
    });
  };
  return Proposal;
};
