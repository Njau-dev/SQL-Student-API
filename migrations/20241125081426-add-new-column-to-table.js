'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('students', 'course_id', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true, // Adjust as needed
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('courses', 'studentId');
  },
};