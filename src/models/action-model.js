module.exports = (sequelize, Sequelize) => {
  const Action = sequelize.define(
    'Action',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
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
      tableName: 'action',
      underscored: true,
      timestamps: true,
    },
  );

  Action.associate = (models) => {
    Action.hasMany(models.RoleAction, {
      foreignKey: 'actionId',
      as: 'roleActions',
    });
  };
  return Action;
};
