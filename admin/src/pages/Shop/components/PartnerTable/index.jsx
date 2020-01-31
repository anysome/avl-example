import React, { Component } from 'react';
import { Table, Pagination, Button, DatePicker, Select, Message, Dialog, Input, NumberPicker } from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceContainer from '@icedesign/container';
import axios from 'axios';
import moment from 'moment';
import styles from './index.module.scss';

const Option = Select.Option;
const { RangePicker } = DatePicker;

const today = new Date().getTime();
const startDate = moment().add(-6, 'month');
const endDate = moment().add(1, 'month');

export default class PartnerTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      datasource: {
        number: 0,
        totalElements: 0,
        content: []
      },
      partners: [],
      dialogVisible: false,
      record: {},
      isAdd: false,
    };
  }

  queryCache = {
    page: 1,
    size: 15,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const result = await axios.post('/admin/shop/query.json', this.queryCache);
    if (result.success) {
      this.setState({
        datasource: result.info,
      });
    } else {
      Message.error(result.message);
    }
  };

  handleSearch = () => {
    this.queryCache.page = 1;
    this.fetchData();
  };

  handlePagination = (current) => {
    this.queryCache.page = current;
    this.fetchData();
  };

  changeStatus = (value) => {
    this.queryCache.status = parseInt(value);
  };

  changeDates = (values) => {
    this.queryCache.availableDateStart = values[0] ? values[0].format('YYYY-MM-DD') : null;
    this.queryCache.availableDateEnd = values[1] ? values[1].format('YYYY-MM-DD') : null;
  };

  renderBool = (value, index, record) => {
    return value ? '有' : '无';
  };

  renderAvailablDate = (value, index, record) => {
    const date = moment(value).format('YYYY.MM.DD');
    if (today < record.availableDate) {
      return (<span className={styles.redText}>{date}</span>);
    } else {
      return date;
    }
  };

  editItem = (record, index, e) => {
    e.preventDefault();
    record.availableDate = moment(record.availableDate).format('YYYY-MM-DD');
    this.setState({
      dialogVisible: true,
      isAdd: false,
      record
    });
  };

  addItem = (e) => {
    e.preventDefault();
    this.setState({
      dialogVisible: true,
      isAdd: true,
      record: {}
    });
  };

  saveForm = () => {
    const { validateAll } = this.refs.form;
    validateAll((errors, values) => {
      if (errors) {
        console.log({ errors });
      } else {
        if (values.availableDays < 1) {
          Message.error('有效期至少 1 天');
          return;
        }
        if (this.state.isAdd) {
          this.addPartner(values);
        } else {
          this.updatePartner(values);
        }
      }
    });
  };

  updateShop = async (values) => {
    const result = await axios.post('/admin/shop/update.json', values);
    if (result.success) {
      Message.success('修改成功');
      values.expiredDate = result.info.expiredDate
      this.setState({
        dialogVisible: false
      });
    } else {
      Message.error(result.message);
    }
  };

  addShop = async (values) => {
    values.availableDate = values.availableDate.format('YYYY-MM-DD');
    const result = await axios.post('/admin/shop/add.json', values);
    if (result.success) {
      Message.success('新增成功');
      const { datasource } = this.state;
      datasource.totalElements = datasource.totalElements + 1;
      datasource.content = [result.info].concat(datasource.content);
      this.setState({
        dialogVisible: false,
        datasource
      });
    } else {
      Message.error(result.message);
    }
  };

  hideDialog = () => {
    this.setState({
      dialogVisible: false
    });
  };

  render() {
    return (
      <div>
        <div className={styles.tableFilter}>
          <div className={styles.title}>餐厅资讯</div>
          <div className={styles.filter}>
            {/* <div className={styles.filterItem}>
              <span className={styles.filterLabel}>状态：</span>
              <Select className={styles.selectWidth} placeholder='全部' onChange={this.changeStatus}>
                <Option value="-1">全部</Option>
                <Option value="1">未冻结</Option>
                <Option value="0">已冻结</Option>
              </Select>
            </div>
            <div className={styles.filterItem}>
              <span className={styles.filterLabel}>生效日期：</span>
              <RangePicker defaultValue={[startDate, endDate]} onChange={this.changeDates} />
            </div> */}
            <Button type="primary" className={styles.submitButton} onClick={this.handleSearch} >
              查询
            </Button>
          </div>
        </div>
        <IceContainer>
          <Button type="primary" onClick={this.addItem}>新增餐厅</Button>
          <Table
            dataSource={this.state.datasource.content}
            onSort={this.handleSort}
            hasBorder={false}
            className={styles.customTable}
            isZebra
          >
            <Table.Column width={100} title="名称" dataIndex="name" align="center" />
            <Table.Column width={200} title="类型" dataIndex="type" align="center" />
            <Table.Column width={150} title="米其林星" dataIndex="star" align="center" />
            <Table.Column width={300} title="停车" dataIndex="park" align="center" cell={this.renderBool} />
            <Table.Column width={100} title="外送" dataIndex="deliverable" align="center" cell={this.renderBool} />
            <Table.Column width={100} title="先缴订金" dataIndex="deposit" align="center" cell={this.renderBool} />
            <Table.Column width={100} title="评价" dataIndex="rate" align="center" />
            <Table.Column width={100} title="地理位置" dataIndex="location" align="center" />
          </Table>
          <div className={styles.pagination}>
          <Pagination
            current={this.state.datasource.number + 1}
            total={this.state.datasource.totalElements}
            pageSize={this.state.datasource.size}
            onChange={this.handlePagination}
          />
        </div>
        </IceContainer>
        <Dialog
            className={styles.simpleFormDialog}
            title={this.state.isAdd?'新增餐厅':'编辑餐厅'}
            onOk={this.saveForm}
            onCancel={this.hideDialog}
            onClose={this.hideDialog}
            visible={this.state.dialogVisible}
          >
             <IceFormBinderWrapper
                value={this.state.record}
                ref="form"
              >
                <div className={styles.formContent}>
                  <div className={styles.formItem}>
                    <div className={styles.formLabel}>合作商：</div>
                    <IceFormBinder
                      required
                      triggerType="onBlur"
                      message="名称不能为空"
                      name="name"
                    >
                      <Input
                        placeholder="请输入名称"
                        size="large"
                        className={styles.width}
                      />
                    </IceFormBinder>
                    <div className={styles.formError}>
                      <IceFormError name="name" />
                    </div>
                  </div>
                  <div className={styles.formItem}>
                    <div className={styles.formLabel}>回调地址：</div>
                    <IceFormBinder
                      type="url"
                      triggerType="onBlur"
                      message="回调地址须为 url"
                      name="callbackUrl"
                    >
                      <Input
                        placeholder="请输入回调地址"
                        size="large"
                        className={styles.width}
                      />
                    </IceFormBinder>
                    <div className={styles.formError}>
                      <IceFormError name="callbackUrl" />
                    </div>
                  </div>
                  <div className={styles.formItem}>
                    <div className={styles.formLabel}>有效期：</div>
                    <IceFormBinder
                      required
                      type="integer"
                      triggerType="onBlur"
                      message="有效期须为整数"
                      name="availableDays"
                    >
                      <NumberPicker size="large" placeholder="请输入" innerAfter={<span className={styles.paddingRight}>天</span>} min={1} className={styles.width} />
                    </IceFormBinder>
                    <div className={styles.formError}>
                      <IceFormError name="availableDays" />
                    </div>
                  </div>
                  <div className={styles.formItem}>
                    <div className={styles.formLabel}>生效日期：</div>
                    <IceFormBinder
                      required
                      triggerType="onBlur"
                      message="生效日期不能为空"
                      name="availableDate"
                    >
                      <DatePicker format="YYYY-MM-DD" className={styles.width} size="large" />
                    </IceFormBinder>
                    <div className={styles.formError}>
                      <IceFormError name="availableDate" />
                    </div>
                  </div>
                  <div className={styles.formItem}>
                    <div className={styles.formLabel}>备注：</div>
                    <IceFormBinder
                      name="remark"
                    >
                      <Input.TextArea
                        placeholder="请输入，选填"
                        size="large"
                        className={styles.width}
                      />
                    </IceFormBinder>
                  </div>
                </div>
              </IceFormBinderWrapper>
          </Dialog>
      </div>
    );
  }
}

