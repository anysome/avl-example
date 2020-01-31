import axios from 'axios';
import moment from 'moment';
import app from './app';

moment.locale('zh-CN');

axios.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      console.log('http request error:', error);
      if (error.response) {
        if (error.response.status === 401) {
          app.logout();
        }
        if (error.response.data && typeof error.response.data === 'object') {
          return error.response.data;
        } else {
          return { success: false, message: error.message };
        }
      } else {
        return { success: false, message: error.message };
      }
    },
  );

console.log('current user:', app.user);

if (!app.user) {
  if (app.history.location.pathname !== '/user/login') {
    app.history.push('/user/login');
  }
}