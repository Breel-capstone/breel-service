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
    Proposal.belongsTo(models.Project, {
      foreignKey: 'projectId',
      as: 'project',
    });
  };
  return Proposal;
};
