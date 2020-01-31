'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Account = app.model.define('client_user_account', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    user_id: INTEGER,
    type: { type: STRING(16), unique: 'accountIndex' },
    account: { type: STRING(256), unique: 'accountIndex' },
    account_name: STRING(64),
    password: STRING(128),
    union_id: STRING(64),
    authed_at: DATE,
    expired_at: DATE,
    created_at: DATE,
    updated_at: DATE,
  });

  return Account;
};
