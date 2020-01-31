'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {

  async login() {
    const { name, password } = this.ctx.request.body;
    this.ctx.logger.info('body:', this.ctx.request.body);
    const service = this.ctx.service.admin;
    const user = await service.login(name, password);
    this.ctx.session.adminId = user.id;
    this.ctx.status = 201;
    this.ctx.result = {
      id: user.id,
      name: name,
    };
  }

  async logout() {
    this.ctx.session = null;
    this.ctx.status = 200;
  }

  async checkStatus() {
    this.ctx.logger.info('Check admin user session');
    this.ctx.result = 'User is logined';
  }
}

module.exports = AdminController;
