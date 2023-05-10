module.exports = (sequelize, Sequelize) => {
  const UserSkill = sequelize.define(
    'UserSkill',
    {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      skillName: {
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
      tableName: 'user_skill',
      underscored: true,
      timestamps: true,
    },
  );

  UserSkill.associate = (models) => {
    UserSkill.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return UserSkill;
};
