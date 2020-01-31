import React, { useState } from 'react';
import { Input, Checkbox, Grid, Message, Form } from '@alifd/next';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import './Login.scss';
import styles from './index.module.scss';
import app from '@/app';

const { Row } = Grid;
const Item = Form.Item;

export default function Index() {
  const [value, setValue] = useState({
    name: 'avl ',
    password: '123456',
    checkbox: false,
  });

  const formChange = (value) => {
    setValue(value);
  };

  const handleSubmit = async (values, errors) => {
    if (errors) {
      console.log('errors', errors);
      return;
    }
    const result = await axios.post('/api/login.json', values);
    console.log('login result:', result);
    if (result.success) {
      app.login(result.info);
      Message.success('登录成功');
      app.history.push('/shop');
    } else {
      Message.error(result.message);
    }
  };

  const responseGoogle = async (response) => {
    console.log('google auth:', response);
    if (!response.tokenId) {
      return;
    }
    const result = await axios.post('/api/login/google.json', { token: response.tokenId });
    console.log('google login result:', result);
    if (result.success) {
      app.login(result.info);
      Message.success('登录成功');
      app.history.push('/shop');
    } else {
      Message.error(result.message);
    }
  };

  return (
    <div className={`${styles.container} user-login`}>
      <div className={styles.header}>
        <a href="#" className={styles.meta}>
          <img
            className={styles.logo}
            src={require('./images/TB13UQpnYGYBuNjy0FoXXciBFXa-242-134.png')}
            alt="logo"
          />
          <span className={styles.title}>飞冰</span>
        </a>
        <p className={styles.desc}>飞冰让前端开发简单而友好</p>
      </div>
      <div className={styles.formContainer}>
        <h4 className={styles.formTitle}>登 录</h4>
        <Form
          value={value}
          onChange={formChange}
          size="large"
        >
          <Item required requiredMessage="必填">
            <Input
              name="name"
              size="large"
              maxLength={20}
              placeholder="管理员账号"
            />
          </Item>
          <Item required requiredMessage="必填">
            <Input
              name="password"
              size="large"
              htmlType="password"
              placeholder="密码"
            />
          </Item>
          <Item >
            <Checkbox name="checkbox" className={styles.checkbox}>记住账号</Checkbox>
          </Item>


          <Row className={styles.formItem}>
            <Form.Submit
              type="primary"
              onClick={handleSubmit}
              className={styles.submitBtn}
              validate
            >
              登 录
              </Form.Submit>
          </Row>

          <Row className={`${styles.tips} tips`}>
            <GoogleLogin
              clientId="27149972255-slnplibscbllbcs03jmdsdrur3enfhnn.apps.googleusercontent.com"
              buttonText="Sign in with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </Row>
        </Form>
      </div>
    </div>
  );
}
