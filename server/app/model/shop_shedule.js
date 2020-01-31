'use strict';

module.exports = app => {
    const { INTEGER, DATE, BOOLEAN, TIME } = app.Sequelize;

    const ShopShedule = app.model.define('shop_shedule', {
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

    return ShopShedule;
};