'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, DATE, BOOLEAN, TIME } = Sequelize;
    return queryInterface.createTable('shop_shedule', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      shop_id: INTEGER,
      week_day: INTEGER,
      opened: BOOLEAN,
      open_from: TIME,
      open_to: TIME,
      deposit: BOOLEAN,
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('shop_shedule');
  }
};
