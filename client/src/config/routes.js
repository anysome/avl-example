import HomePage from '@/pages/HomePage';
import BlankLayout from '@/layouts/BlankLayout';
import Login from '@/pages/Login';
import GMap from '@/pages/GMap';

const routerConfig = [
  {
    path: '/',
    component: BlankLayout,
    children: [
      { path: '/login', component: Login },
      { path: '/map', component: GMap },
      { path: '/', component: HomePage },
    ],
  },
];

export default routerConfig;
