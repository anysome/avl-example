'use strict';

module.exports = () => {
  return async function (ctx, next) {
    const userId = ctx.session.userId;
    ctx.logger.info('user id is :', userId);
    if (userId) {
        await next();
    } else {
        ctx.throw(401, 'Login Required');
    }
  }
};
