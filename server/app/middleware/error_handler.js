'use strict';

module.exports = (option, app) => {
  // 中间件的配置项，框架会将 app.config[${middlewareName}] 传递进来
  return async function(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      app.emit('error', err, this);
      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error = status === 500 && app.config.env === 'prod'
        ? 'Internal Server Error'
        : err.message ? err.message : err;
      // 从 error 对象上读出各个属性，设置到响应中
      const result = {
        code: status,
        message: error,
        success: false,
      };
      if (app.config.env !== 'prod') {
        result.info = err.errors;
      }
      ctx.body = result;
      ctx.status = status;
    }
  };
};
