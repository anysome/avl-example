'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    return queryInterface.createTable('admin_user', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: STRING(128), unique: true },
      email: STRING(128),
      password: STRING(256),
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('admin_user');
  }
};
