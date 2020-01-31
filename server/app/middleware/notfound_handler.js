'use strict';

module.exports = () => {
  return async function notFoundHandler(ctx, next) {
    await next();
    if (ctx.status === 404) {
      const info = ctx.body;
      ctx.body = {
        code: 404,
        message: 'Not Found',
        success: false,
        info,
      };
    } else if (!ctx.body) {
      ctx.body = {
        code: ctx.status,
        message: 'Nothing Back',
        success: true,
      };
    }
  };
};
