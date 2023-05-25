module.exports = (sequelize, Sequelize) => {
  const DailyMentoring = sequelize.define(
    'DailyMentoring',
    {
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
      tableName: 'daily_mentoring',
      underscored: true,
      timestamps: true,
    },
  );

  DailyMentoring.associate = (models) => {
    DailyMentoring.belongsTo(models.User, {
      foreignKey: 'freelancerId',
      as: 'freelancer',
    });
  };

  return DailyMentoring;
};
