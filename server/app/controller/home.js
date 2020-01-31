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
}

module.exports = HomeController;
