module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define(
    'Role',
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
      tableName: 'role',
      underscored: true,
      timestamps: true,
    },
  );

  Role.associate = (models) => {
    Role.hasMany(models.RoleAction, {
      foreignKey: 'roleId',
      as: 'roleActions',
    });
    Role.hasMany(models.User, {
      foreignKey: 'roleId',
      as: 'users',
    });
  };
  return Role;
};
