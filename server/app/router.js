'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const isAdmin = app.middleware.isAdmin();
  const isLogin = app.middleware.isLogin();
  
  router.get('/', controller.home.index);

  // admin
  router.get('/admin/logout.json', controller.admin.logout);
  router.post('/admin/login.json', controller.admin.login);
  router.get('/admin/status.json', isAdmin, controller.admin.checkStatus);

  // client
  router.post('/api/login.json', controller.login.myself);
  router.post('/api/login/google.json', controller.login.google);
  router.get('/api/logout.json', controller.login.logout);
  router.get('/api/status.json', isLogin, controller.login.checkStatus);

  // user test
  router.post('/test.json', controller.home.test);
  router.resources('users', '/users', controller.user);
};
