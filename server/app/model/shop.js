'use strict';

module.exports = app => {
  const { INTEGER, DATE, STRING, BOOLEAN, FLOAT, GEOMETRY } = app.Sequelize;

  const Shop = app.model.define('shop', {
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

  return Shop;
};