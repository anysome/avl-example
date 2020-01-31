'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, BOOLEAN, FLOAT, GEOMETRY } = Sequelize;
    return queryInterface.createTable('shop', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(128),
      type: STRING(32),
      star: INTEGER,
      park: BOOLEAN,
      deliverable: BOOLEAN,
      deposit: BOOLEAN,
      rate: FLOAT,
      location: GEOMETRY('POINT'),
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('shop');
  }
};
