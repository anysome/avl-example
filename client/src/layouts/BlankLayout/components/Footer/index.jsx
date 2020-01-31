import React from 'react';
import { Grid } from '@alifd/next';
import styles from './index.module.scss';

const { Row, Col } = Grid;

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.copyRight}>Layman © 2020 版权所有</p>
      </div>
    </div>
  );
}
