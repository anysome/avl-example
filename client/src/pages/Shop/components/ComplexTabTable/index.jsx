import React, { useState, useEffect } from 'react';
import { Table, Pagination, Tab, Search, DatePicker, Select, Button, TimePicker } from '@alifd/next';
import IceContainer from '@icedesign/container';
import IceImg from '@icedesign/img';
import moment from 'moment';
import axios from 'axios';
import SubCategoryItem from './SubCategoryItem';
import data from './data';
import styles from  './index.module.scss';

const queryCache = {};

const today = moment().add(-1, 'day');

export default function Index() {
  const [isMobile] = useState(false);
  const [currentTab, setCurrentTab] = useState('solved');
  const [currentCategory, setCurrentCategory] = useState('1');
  const [datasource, setDatasource] = useState({});

  const renderTitle = (value, index, record) => {
    return (
      <div className={styles.titleWrapper}>
        <div>
          <IceImg src={record.cover} width={48} height={48} />
        </div>
        <span className={styles.titleName}>{record.title}</span>
      </div>
    );
  };

  useEffect(() => {
    onSearch();
  }, [isMobile]);

  const editItem = (record, e) => {
    e.preventDefault();
    // TODO: record 为该行所对应的数据，可自定义操作行为
  };

  const renderOperations = (value, index, record) => {
    return (
      <div className={styles.complexTabTableOperation}>
        <a
          href="#"
          className={styles.operation}
          target="_blank"
          onClick={() => editItem(record)}
        >
          解决
        </a>
        <a href="#" className={styles.operation} target="_blank">
          详情
        </a>
        <a href="#" className={styles.operation} target="_blank">
          分类
        </a>
      </div>
    );
  };

  const renderStatus = (value) => {
    return value;
  };

  const fetchData = () => {
    console.log('fetch data');
  };

  const onSearch = async () => {
    const result = await axios.post('/api/shop/query.json', queryCache);
    if (result.success) {
      setDatasource(result.info);
    } else {
      console.error(result.message);
    }
    console.log('search data.', result);
  };

  const onTabChange = (tabKey) => {
    const firstTabCatId = tabList.find((item) => {
      return item.type === tabKey;
    }).subCategories[0].id;

    setCurrentTab(tabKey);
    setCurrentCategory(firstTabCatId);
    queryCache.catId = firstTabCatId;
    fetchData();
  };

  const onSubCategoryClick = (catId) => {
    setCurrentCategory(catId);
    queryCache.catId = catId;
    fetchData();
  };

  const renderTabBarExtraContent = () => {
    return (
      <div className={styles.tabExtra}>
        <Search
          className={styles.search}
          type="secondary"
          placeholder="搜索"
          searchText=""
          onSearch={onSearch}
        />
      </div>
    );
  };

  const disabledDate = (value) => {
    return today.isAfter(value);
  };

  return (
    <div className={styles.complexTabTable}>
      <IceContainer>
        <div className={styles.tableFilter}>
          <div className={styles.title}>过滤餐厅</div>
          <div className={styles.filter}>
            <div className={styles.filterItem}>
              <span className={styles.filterLabel}>日期：</span>
              <DatePicker disabledDate={disabledDate} />
            </div>
            <div className={styles.filterItem}>
              <span className={styles.filterLabel}>时间：</span>
              <TimePicker format="HH:mm" minuteStep={30} />
            </div>
            <Button type="primary" className={styles.submitButton} >
              查询
            </Button>
          </div>
        </div>
      </IceContainer>
      <IceContainer>
        <Table
          dataSource={data}
          className={`basic-table ${styles.basicTable}`}
          hasBorder={false}
        >
          <Table.Column
            title="问题描述"
            cell={renderTitle}
            width={320}
          />
          <Table.Column title="问题分类" dataIndex="type" width={85} />
          <Table.Column
            title="发布时间"
            dataIndex="publishTime"
            width={150}
          />
          <Table.Column
            title="状态"
            dataIndex="publishStatus"
            width={85}
            cell={renderStatus}
          />
          <Table.Column
            title="操作"
            dataIndex="operation"
            width={150}
            cell={renderOperations}
          />
        </Table>
        <div className={styles.pagination}>
          <Pagination />
        </div>
      </IceContainer>
    </div>
  );
}
