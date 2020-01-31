'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const AdminUser = app.model.define('admin_user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING(128), unique: true },
    email: STRING(128),
    password: STRING(256),
    created_at: DATE,
    updated_at: DATE,
  });

  AdminUser.findByName = async function(name) {
    return await this.findOne({
      where: { name },
    });
  };

  return AdminUser;
};
