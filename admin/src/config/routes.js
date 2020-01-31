import UserLogin from '@/pages/UserLogin';
import NotFound from '@/pages/NotFound';

import UserLayout from '@/layouts/UserLayout';
import BasicLayout from '@/layouts/BasicLayout';
import Shop from '@/pages/Shop';

const routerConfig = [
  {
    path: '/user',
    component: UserLayout,
    children: [
      { path: '/login', component: UserLogin },
    ],
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      { path: '/shop', component: Shop },
      { path: '/', redirect: '/shop' },
      { component: NotFound },
    ],
  },
];

export default routerConfig;
