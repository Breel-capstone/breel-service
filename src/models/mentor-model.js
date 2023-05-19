module.exports = (sequelize, Sequelize) => {
  const Mentor = sequelize.define(
    'Mentor',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
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
      tableName: 'mentor',
      underscored: true,
      timestamps: true,
    },
  );

  Mentor.associate = (models) => {
    Mentor.hasOne(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return Mentor;
};
