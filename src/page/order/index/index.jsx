import React from 'react';
import { connect } from 'react-redux';
import { List, Pagination } from 'antd';
import { getListOrder, getCountOrderNums, getOrderStatusNames } from '../../../store/order/active.js';
import Detail from '../detail/index.jsx';

import './index.scss';


class OrderIndex extends React.Component{
    constructor(props){
        super(props);
        const orderState = this.props.match.params.orderState;
        this.state = {
            currentStatus: orderState,
            OrderList:[],
            orderParam:{
                pageNumber: 1,
                pageSize: 20,
                sort: "CreateDate",
                order: "desc",
                queryJson: JSON.stringify({
                    SearchString: "",
                    OrderState: orderState
                })
            },
            detailProps: {
                orderId: '',
                orderParam: {},
                orderDetail: this.props.orderData.orderDetail,
                width: 1070,
                visible: false,
                footer: null,
                onCancel: () => {
                    this.setState({
                        detailProps: Object.assign({}, this.state.detailProps, { visible: false })
                    })
                },
            }

        }
    }

    componentDidMount(){
        this.props.getListOrder(this.state.orderParam);
        this.props.getCountOrderNums();
        this.props.getOrderStatusNames();
    }

    changeOrderState = (e) => {
        const currentStatus = e.currentTarget.getAttribute('data-status');  
        const queryJson = Object.assign({}, JSON.parse(this.state.orderParam.queryJson), {
            OrderState: currentStatus
        })
        this.setState({
            currentStatus: currentStatus,
            orderParam: Object.assign({}, this.state.orderParam, {
                queryJson: JSON.stringify(queryJson)
            })
            },() =>{
                this.props.getListOrder(this.state.orderParam);
            }
        );
    }

    onPageNumberChange = (pageNumber, pageSize) => {
        this.setState({
            orderParam: Object.assign({}, this.state.orderParam, {
                pageNumber: pageNumber,
                pageSize: pageSize
            })
        },()=>{
            this.props.getListOrder(this.state.orderParam);
        });
    }

    onPageSizeChange = (pageNumber, pageSize) => {
        this.setState({
            orderParam: Object.assign({}, this.state.orderParam, {
                pageNumber: pageNumber,
                pageSize: pageSize
            })
        },()=>{
            this.props.getListOrder(this.state.orderParam);
        })
    }

    showOrderDetail = (e) =>{
        const orderId = e.target.getAttribute("data-orderid");
        this.setState({
            detailProps: Object.assign({}, this.state.detailProps, { 
                visible: true,
                orderId: orderId,
                orderParam: this.state.orderParam
             })
        })

    }

    //判断频道
    switStatusName = (orderstatus) => {
        switch(orderstatus){
            case  "TobeCheckState":
                return "待审核";
                break;
            case  "TobePurchaseState":
                return  "待配货";
                break;
            case  "TobeBillState":
                return "待结算";
                break;
            case  "TobeExpressState":
                return "待发货";
                break;
            case  "TobeCompleteState":
                return "待收货";
                break;
            case  "CompleteState":
                return "已完成";
                break;
            case  "CancelledState":
                return "已取消";
                break;
            case  "AllState":
                return "全部订单";
                break;
            default:
                return ""
                break;    
        }
    }

    render(){
        var _this = this;
        const orderList = this.props.orderData.orderList;
        const total = this.props.orderData.total;
        const orderCountNums = this.props.orderData.orderCountNums;
        const orderStatusNames = this.props.orderData.orderStatusNames;
        const Tab = orderCountNums.map((item,index)=>{ 
            var activeName = item['OrderState'] == _this.state.currentStatus ? 'active' : '';
            var statusName = _this.switStatusName(item["OrderState"]);
            if(item["OrderState"] == "TobePurchaseState" || item["OrderState"] == "TobeBillState" || item["OrderState"] =="TobeExpressState" || item["OrderState"] =="TobeCompleteState" || item["OrderState"] =="CancelledState"){
                return (
                    <li key={item['OrderState']} className="orderState_item">
                        <a className={ activeName } onClick={ _this.changeOrderState} data-status={item['OrderState']}   href="javascript:;">{`${statusName}(${item['Nums']})`}</a>
                    </li>
                ) 
            }
        });
        return (
            <div >  
                <ul className="orderState_list radio_list" >
                    { Tab }
                </ul>
                <ul className="order_list">
                    {
                        orderList.map((order, index) => {
                            let orderState = order["OrderState"];
                            return (
                                <li className="order_item" key={order['OrderId']}>
                                    <h3 className="title clearfix">
                                        <i></i>
                                        <span>{order["CustomerCName"]}&nbsp;&nbsp;&nbsp;&nbsp;{order["sellerName"]}</span>
                                        <span className="tel">下单号码：{order["SellerTelphone"]}</span>
                                        <span className="state">{orderStatusNames[orderState]}</span>
                                    </h3>
                                    <div className="info_wrap">
                                        <div className="quantity">
                                            <p><span style={{fontSize: 25, fontWeight: "bold"}}>{order["TotalQuantity"]}</span>件</p>
                                            <p>约{order["TotalGoldWeight"]}-{order["TotalGoldWeightB"]}g</p>
                                        </div>
                                        <div className="info">
                                            <p>
                                                <span>证书：{order["Certificate"]}</span>
                                                <span>挂签：{order["GoldTag"]}</span>
                                                <span>字印：{order["Lettering"]}</span>
                                            </p>
                                            <p className="desc_wrap">
                                                <span>备注：</span>
                                                <input type="text" className="desc" defaultValue={order["Description"]} />
                                            </p>
                                        </div>                            
                                    </div>
                                    <div className="footer">
                                        <span className="circle_left"></span> 
                                        <span className="circle_right"></span>
                                        <span className="orderCode pl">订单号：{order["OrderCode"]}</span>
                                        <div className="pr info">
                                            <span className="time">{order["CreateDate"]}</span>
                                            <a href="javascript:;" data-orderid={order["OrderId"]} className="btn view_btn" onClick={this.showOrderDetail}>查看订单</a>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                {
                    total >0 
                        ? <Pagination 
                            total={total} 
                            pageSize={this.state.orderParam.pageSize} 
                            current={this.state.orderParam.pageNumber}
                            showSizeChanger 
                            showQuickJumper 
                            pageSizeOptions={['20','30','50','100']}
                            onChange={this.onPageNumberChange}
                            onShowSizeChange={this.onPageSizeChange}
                        />
                        : null
                }
                {this.state.detailProps.visible && <Detail {...this.state.detailProps}/>}
            </div>
            
        )
    }
}

export default connect(
    state => ({
        orderData: state.orderData,
    }),{
        getListOrder,
        getCountOrderNums,
        getOrderStatusNames
    }
)(OrderIndex);