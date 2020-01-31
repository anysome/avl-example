/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1580309775121_860';

  // add your middleware config here
  config.middleware = [ 'errorHandler', 'notfoundHandler' ];

  config.security = {
    csrf: {
      ignoreJSON: true,
    },
  };

  config.session = {
    renew: true,
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '192.168.64.2',
    port: 3306,
    database: 'avl-doc-default',
    username: 'avl',
    password: 'avl-example',
    define: {
      freezeTableName: true,
      underscored: true,
    },
  };

  // add your user config here
  const userConfig = {
    google: {
      key: '27149972255-slnplibscbllbcs03jmdsdrur3enfhnn.apps.googleusercontent.com',
      secret: 'pkfjr5pjPsYWbK38lKY6ZxOB',
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};
