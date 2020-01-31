'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    return queryInterface.createTable('client_user', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(128),
      email: STRING(128),
      avatar: STRING(256),
      age: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('client_user');
  }
};
