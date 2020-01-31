// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '退出',
    path: '/user/login',
    icon: 'yonghu',
  },
];

const asideMenuConfig = [
  { name: '工作台', path: '/dashboard', icon: 'home2', id: 'Menu_r572a' },
  { name: '订单报表', path: '/order/report', icon: 'chart', id: 'Menu_u31pc' },
  { name: '订单管理', path: '/order/list', icon: 'shopcar', id: 'Menu_l63d0' },
  { name: '退单管理', path: '/chargeback', icon: 'cascades', id: 'Menu_rqurq' },
  { name: '发货管理', path: '/dispatch', icon: 'clock', id: 'Menu_906v1' },
  { name: '商品管理', path: '/goods', icon: 'shopcar', id: 'Menu_eecxm' },
  { name: '添加商品', path: '/add/goods', icon: 'publish', id: 'Menu_eq2sk' },
  { name: '添加订单', path: '/add/order', icon: 'edit2', id: 'Menu_3rv5a' },
];

export { headerMenuConfig, asideMenuConfig };
