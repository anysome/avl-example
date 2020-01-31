'use strict';

const Controller = require('egg').Controller;
const md5 = require('md5');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.result = 'hi, avl';
  }

  async test() {
    const { p, s } = this.ctx.request.body;
    this.ctx.result = md5(p + s);
  }

  async queryShop() {
    let { page, size } = this.ctx.request.body;
    page || (page = 1);
    size || (size = 15);
    const content = await this.ctx.service.shop.query(page -1, size);
    this.ctx.result = {
      page,
      size,
      content,
    };
  }
}

module.exports = HomeController;
