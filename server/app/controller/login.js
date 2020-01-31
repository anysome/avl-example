'use strict';

const Controller = require('egg').Controller;
const { OAuth2Client } = require('google-auth-library');

class LoginController extends Controller {

    async myself() {
        const { name, password } = this.ctx.request.body;
        const service = this.ctx.service.login;
        const user = await service.myself(name, password);
        this.ctx.session.userId = user.id;
        this.ctx.status = 201;
        this.ctx.result = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
        };
    }

    async google() {
        const clientId = this.app.config.google.key;
        this.ctx.logger.info('google client id:', clientId);
        const { token } = this.ctx.request.body;
        this.ctx.logger.info('google auth token:', token);
        const client = new OAuth2Client(clientId);
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: clientId,
        });
        const payload = ticket.getPayload();
        this.ctx.logger.info('google payload:', payload);
        if (clientId != payload['aud']) {
            this.ctx.throw(403, 'Login Failed');
        }
        const service = this.ctx.service.login;
        const user = await service.google(payload);
        this.ctx.logger.info('google user:', user);
        this.ctx.session.userId = user.id;
        this.ctx.status = 201;
        this.ctx.result = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
        };
    }

    async logout() {
        this.ctx.session = null;
        this.ctx.status = 200;
    }

    async checkStatus() {
        this.ctx.logger.info('Check user session');
        this.ctx.result = this.ctx.session.userId;
    }
}

module.exports = LoginController;
