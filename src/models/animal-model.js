module.exports = (sequelize, Sequelize) => {
  const Animal = sequelize.define(
    'Animal',
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
      tableName: 'animal',
      underscored: true,
      timestamps: true,
    },
  );

  return Animal;
};
