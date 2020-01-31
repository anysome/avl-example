'use strict';

const Service = require('egg').Service;
const md5 = require('md5');

class LoginService extends Service {

    async myself(name, password) {
        const model = this.ctx.model.UserAccount;
        const entity = await model.findOne({
            where: {
                type: 'self',
                account: name
            }
        })
        if (!entity) {
            this.ctx.throw(404, 'User name or password error.');
        }
        if (md5(password + '_salt-avl-client') !== entity.password) {
            this.ctx.throw(404, 'User name or password error.');
        }
        this.ctx.logger.info('self account:', entity);
        const userModel = this.ctx.model.ClientUser;
        const user = await userModel.findByPk(entity.user_id);
        return user;
    }

    async google(payload) {
        const model = this.ctx.model.UserAccount;
        const entity = await model.findOne({
            where: {
                type: 'google',
                account: payload['sub']
            }
        })
        const userModel = this.ctx.model.ClientUser;
        if (entity) {
            this.ctx.logger.info('google account:', entity);
            const user = await userModel.findByPk(entity.user_id);
            return user;
        } else {
            const user = await userModel.create({
                name: payload['name'],
                email: payload['email'],
                avatar: payload['picture'],
            });
            const account = await model.create({
                user_id: user.id,
                type: 'google',
                account: payload['sub'],
                account_name: payload['name'],
            });
            this.ctx.logger.info('google account:', account);
            return user;
        }
    }
}

module.exports = LoginService;
