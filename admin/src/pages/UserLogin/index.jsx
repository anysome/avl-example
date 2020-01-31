import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Button, Message } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/foundation-symbol';
import axios from 'axios';
import styles from './index.module.scss';
import app from '@/app';

let form;
function UserLogin(props) {
  const [value, setValue] = useState({
    name: 'avl',
    password: '1',
  });

  const formChange = (formValue) => {
    setValue(formValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateAll( async (errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      const result = await axios.post('/admin/login.json', values);
      if (result.success) {
        app.login(result.info);
        Message.success('登录成功');
        props.history.push('/');
      } else {
        Message.error(result.message);
      }
    });
  };

  const toNext = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>登 录</h4>
      <IceFormBinderWrapper
        value={value}
        onChange={formChange}
        ref={formRef => form = formRef}
      >
        <div className={styles.formItems}>
          <div className={styles.formItem}>
            <IceIcon type="person" size="small" className={styles.inputIcon} />
            <IceFormBinder name="name" required message="必填">
              <Input
                size="large"
                maxLength={20}
                placeholder="用户名"
                className={styles.inputCol}
              />
            </IceFormBinder>
            <IceFormError name="name" />
          </div>

          <div className={styles.formItem}>
            <IceIcon type="lock" size="small" className={styles.inputIcon} />
            <IceFormBinder name="password" required message="必填">
              <Input
                size="large"
                htmlType="password"
                placeholder="密码"
                className={styles.inputCol}
                onKeyDown={toNext}
              />
            </IceFormBinder>
            <IceFormError name="password" />
          </div>

          <div className={styles.footer}>
            <Button
              type="primary"
              size="large"
              onClick={handleSubmit}
              className={styles.submitBtn}
            >
              登 录
            </Button>
          </div>
        </div>
      </IceFormBinderWrapper>
    </div>
  );
}


export default withRouter(UserLogin);
