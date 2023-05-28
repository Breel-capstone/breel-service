module.exports = (sequelize, Sequelize) => {
  const DailyMentoringApplicant = sequelize.define(
    'DailyMentoringApplicant',
    {
      applicantId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      dailyMentoringId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('Pending', 'Approved', 'Rejected'),
        defaultValue: 'Pending',
      },
      expiredAt: {
        type: Sequelize.DATE,
        allowNull: true,
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
      tableName: 'daily_mentoring_applicant',
      underscored: true,
      timestamps: true,
    },
  );

  DailyMentoringApplicant.associate = (models) => {
    DailyMentoringApplicant.belongsTo(models.User, {
      foreignKey: 'applicantId',
      as: 'applicant',
    });
    DailyMentoringApplicant.belongsTo(models.DailyMentoring, {
      foreignKey: 'dailyMentoringId',
      as: 'dailyMentoring',
    });
  };

  return DailyMentoringApplicant;
};
