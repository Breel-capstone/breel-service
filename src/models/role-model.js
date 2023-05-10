module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define(
    'Role',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
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
      tableName: 'role',
      underscored: true,
      timestamps: true,
      associate: (models) => {
        Role.hasMany(models.RoleAction, {
          foreignKey: 'roleId',
          as: 'roleActions',
        });
      },
    },
  );
  return Role;
};
