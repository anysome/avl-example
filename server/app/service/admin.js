'use strict';

const Service = require('egg').Service;
const md5 = require('md5');

class AdminService extends Service {

  async login(user, password) {
    const model = this.ctx.model.AdminUser;
    const entity = await model.findByName(user);
    if (!entity) {
      this.ctx.throw(404, 'User name or password error.');
    }
    if (md5(password + '_salt-avl-admin') !== entity.password) {
      this.ctx.throw(404, 'User name or password error.');
    }
    return entity;
  }
}

module.exports = AdminService;
