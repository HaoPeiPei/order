import React from 'react';
import { connect } from 'react-redux';

import { getOrderList } from '../../../store/order/active.js';
import './index.scss';


class OrderIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderStatus: [
                {
                    "status": 'DengDaiQueRen',
                    "name": '待确认'
                },
                {
                    "status": 'DengDaiFaHuo',
                    "name": '待发货'
                },
                {
                    "status": 'DengDaiShouHuo',
                    "name": '待收货'
                },
                {
                    "status": 'YiWanCheng',
                    "name": '已完成'
                },
                {
                    "status": '',
                    "name": '全部订单'
                }
            ],
            currentStatus: 'DengDaiQueRen',
            OrderList:[]
        }
    }

    componentDidMount(){
        let data = {
            "page": 1,
            "pageCount": 10,
            "ordId": 0,
            "ordNo": 0,
            searchInfo: {
                "status": this.state.currentStatus,
                "searchStr": ''
            },
        }
        if(!this.props.orderList.length ){
            this.props.getOrderList(`/Order/Inte301`,data);
        }
    }

    changeOrderState = (e) => {
        var currentStatus = e.currentTarget.getAttribute('data-status');        
        this.setState({
            currentStatus: currentStatus
        })
      }




    render(){
        const Tab = this.state.orderStatus.map((item,index)=>{ 
            var activeName = item['status'] == this.state.currentStatus ? 'active' : '';
            return (
                <li key={item['status']}>
                    <a className={ activeName } onClick={ this.changeOrderState} data-status={item['status']} data-name={item['name']}  href="javascript:;">{ item['name']}</a>
                </li>
            ) 
        });
        return (
            <div className="main_right pr orderIndex">
                <div className="order_state">     
                    <ul className="order_state clearfix" id="orderclick">
                        { Tab }
                    </ul>
                </div>
                <ul className="order_detail"></ul>
                <div className="stu_paging" id="pager"></div>
            </div>
            
        )
    }
}

export default connect(
    state => ({
        orderList: state.orderData.orderList
    }),{
        getOrderList
    }
)(OrderIndex);