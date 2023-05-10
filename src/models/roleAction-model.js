module.exports = (sequelize, Sequelize) => {
  const RoleAction = sequelize.define(
    'RoleAction',
    {
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'role',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      actionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'action',
          key: 'id',
        },
        onDelete: 'CASCADE',
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
      tableName: 'role_action',
      underscored: true,
      timestamps: true,
      associate: (models) => {
        RoleAction.belongsTo(models.Role, {
          foreignKey: 'roleId',
          as: 'role',
        });
        RoleAction.belongsTo(models.Action, {
          foreignKey: 'actionId',
          as: 'action',
        });
      },
    },
  );
  return RoleAction;
};
