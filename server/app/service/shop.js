'use strict';

const Service = require('egg').Service;

class ShopService extends Service {

    async query(page, size) {
        const model = this.ctx.model.Shop;
        const offset = page * size;
        return await model.findAll({ offset, limit: size });
    }

    async create(shop) {
        const model = this.ctx.model.Shop;
        const entity = await model.create(shop);
        return entity;
    }
}

module.exports = ShopService;
