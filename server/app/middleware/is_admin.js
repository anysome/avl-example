'use strict';

module.exports = () => {
  return async function (ctx, next) {
    const adminId = ctx.session.adminId;
    ctx.logger.info('admin id is :', adminId);
    if (adminId) {
        await next();
    } else {
        ctx.throw(401, 'Login Required');
    }
  }
};
