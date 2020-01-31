import BlankLayout from '@/layouts/BlankLayout';
import Login from '@/pages/Login';
import Shop from '@/pages/Shop';

const routerConfig = [
  {
    path: '/',
    component: BlankLayout,
    children: [
      { path: '/login', component: Login },
      { path: '/shop', component: Shop },
      { path: '/', component: Shop },
    ],
  },
];

export default routerConfig;
