'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const ClientUser = app.model.define('client_user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(128),
    email: STRING(128),
    avatar: STRING(256),
    age: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  return ClientUser;
};
