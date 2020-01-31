import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import styles from './index.module.scss';
import app from '@/app';

export default function Header() {

  const [user, setUser] = useState(app.user);

  useEffect(() => {
    if (user !== app.user) {
      console.log('header load');
      setUser(app.user);
    }
  });

  const logout = (e) => {
    e.preventDefault();
    axios.get('/api/logout.json');
    app.logout();
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to="/" className={styles.logoLink}>
          LOGO
        </Link>
      </div>
      <ul className={styles.nav}>
        <li className={styles.navItem}>
          <Link to="/" className={styles.activeNavItemLink}>
            首页
          </Link>
          { user == null ? (
            <Link to="/login" className={styles.navItemLink}>
              登录
            </Link>
          ) : (
            <Link to="/login" className={styles.navItemLink} onClick={logout}>
              登出
            </Link>
          ) }
        </li>
      </ul>
    </div>
  );
}
