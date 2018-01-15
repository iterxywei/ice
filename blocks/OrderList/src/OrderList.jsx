'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Table } from '@icedesign/base';
import IceCard from '@icedesign/card';
import './OrderList.scss';

export default class OrderList extends Component {
  static displayName = 'OrderList';

  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      tableData: []
    };
  }

  componentDidMount() {
    this.getTableData();
  }

  /**
   * 异步获取数据
   */
  getTableData = () => {
    axios.get('/mock/order-list.json')
      .then(response => {
        this.setState({
          tableData: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  /**
   * 渲染订单信息
   */
  renderOrderInfo = (product) => {
    return (
      <div className="order-info" style={styles.orderInfo}>
        <img src={product[0].avatar} className="order-img" style={styles.orderImg} />
        <div className="order-description" style={styles.orderDescription}>{product[0].description}</div>
      </div>
    );
  };


  /**
   * 渲染订单价格
   */
  renderOrderPrice = (price) => {
    return <b>{price}</b>;
  }

  /**
   * 渲染订单单号
   */
  renderOrderNumber = (record) => {
    return <div>{record.product[0].title}</div>;
  }


  /**
   * 设置每一行的样式名称
   */
  getRowClassName = (record) => {
    if (record.status == 0) {
      return 'highlight-row';
    }
  }

  /**
   * 渲染操作行
   */
  renderOperation = () => {
    return <a href="/" className="order-detail-link" style={styles.orderDetailLink}>查看</a>;
  }

  /**
   * 选中当前行的回调
   */
  handleRowSelection = (selectedRowKeys, records) => {
    console.log('selectedRowKeys:', selectedRowKeys);
    console.log('records:', records);
  }

  render() {
    const rowSelection = {
      onChange: this.handleRowSelection,
      mode: 'single'
    };

    const { tableData } = this.state;

    return (
      <div className="order-list" style={styles.orderList}>
        <IceCard>
          <div className="order-list-head" style={styles.orderListHead}>订单列表</div>
          <Table dataSource={tableData}
            getRowClassName={this.getRowClassName}
            rowSelection={rowSelection}
          >
            <Table.GroupHeader cell={this.renderOrderNumber} />
            <Table.Column cell={this.renderOrderInfo} title="商品" dataIndex="product" />
            <Table.Column cell={this.renderOrderPrice} title="价格" dataIndex="price" width={120} />
            <Table.Column cell={this.renderOperation} title="操作" width={100} />
          </Table>
        </IceCard>
      </div>
    );
  }
}

const styles = {"orderImg":{"width":"60px","height":"60px","float":"left","marginRight":"10px"},"orderDetailLink":{"textDecoration":"none"},"orderList":{},"orderListHead":{"marginBottom":"20px","color":"#666"}}