import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import 'echarts/lib/chart/line';
import Chart from '../../../component/chart/index.jsx';
import { getCountOrderGoldTypeList, getCountProduct } from '../../../store/member/active.js';
import { getCountOrderNums } from '../../../store/order/active.js';

import './index.scss';

class ManagerIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentDateType: {
                value: 1,
                type: "month"
            },
            renderer: 'canvas'
        };
        this.dateTypeList = [
            {
                value: 7,
                type: "day"
            },
            {
                value: 1,
                type: "month"
            },
            {
                value: 3,
                type: "month"
            },
            {
                value: 6,
                type: "month"
            },
        ]
    }

    componentDidMount(){
        this.props.getCountOrderNums();
        this.props.getCountProduct(this.state.currentDateType);    
        this.props.getCountOrderGoldTypeList(this.state.currentDateType);
    }

    getOption = () => {
        const countProduct = this.props.memberData.countProduct;
        const option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: [
                    {
                        name: "新增订单",
                    },
                    {
                        name: "取消订单",
                    }
                ],
                orient: 'horizontal',
                x: 'center',
                y: 'bottom',
            },
            grid: {
                top:'18%',
                left: '2%',
                right: '4%',
                bottom: '12%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: countProduct.Date
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '新增订单',
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: '#43CD80'
                        }
                    },
                    data: countProduct.AddNum
                },
                {
                    name: '取消订单',
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: '#B8B8B8'
                        }
                    },
                    data: countProduct.DownNum
                }
            ]
        };
        return option;
    };  

    changeDateType = (e) => {
        let value = e.target.getAttribute('data-value');
        let type = e.target.getAttribute('data-type');
        this.setState({
            currentDateType: Object.assign({}, this.state.currentDateType, {
                    value: value,
                    type: type,
                })
            },() => {
                this.props.getCountProduct(this.state.currentDateType);    
                this.props.getCountOrderGoldTypeList(this.state.currentDateType);
            }
        )
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
        let _this = this;
        const countOrderGoldTypeList = this.props.memberData.countOrderGoldTypeList;
        const orderCountNums = this.props.orderData.orderCountNums;
        const Tab = orderCountNums.map((item,index)=>{ 
            var activeName = item['OrderState'] == _this.state.currentStatus ? 'active' : '';
            var statusName = _this.switStatusName(item["OrderState"]);
            if(item["OrderState"] == "TobePurchaseState" || item["OrderState"] == "TobeBillState" || item["OrderState"] =="TobeExpressState" || item["OrderState"] =="TobeCompleteState" || item["OrderState"] =="CancelledState"){
                return (
                    <li key={item['OrderState']} className="orderState_item">
                        <img src={require(`../../../assets/images/${item["OrderState"]}_icon.png`)} alt=""/>
                        <Link to={`/order/index/${item['OrderState']}`} className="text">{`${statusName}(${item['Nums']})`}</Link>
                    </li>
                ) 
            }
        });

        return (
            <div className="managerIndex">
                <div className="personal">
                    <img src="../Content/images/personal_avatar.png" alt="" />
                    <div className="personal_info">
                        <span>羊咩咩</span><br />
                        <span>临安专卖店</span>
                    </div>
                    <a href="javascript:;" className="set_personal_info pr">设置个人信息
                        <i className="iconfont icon-arrow-right "></i>
                    </a>
                </div>
                <ul className="orderState_list clearfix">
                    {Tab}
                </ul>
                <div className="orders_received">
                    <h3 className="title_wrap">  
                        <span className="title">订单统计</span>
                        <span className="dayList btn-group">
                        {
                            this.dateTypeList.map((dateType, index)=>{
                                let activeClass = "";
                                let dateTypeName = "";
                                if(dateType.value == 7 && dateType.type == "day"){
                                    activeClass = this.state.currentDateType.value ==  7 && this.state.currentDateType.type == "day" ? "active" : "";
                                    dateTypeName = "一周";
                                }else if(dateType.value == 1 && dateType.type == "month"){
                                    activeClass = this.state.currentDateType.value ==  1 && this.state.currentDateType.type == "month" ? "active" : "";
                                    dateTypeName = "一个月";
                                }else if(dateType.value == 3 && dateType.type == "month"){
                                    activeClass = this.state.currentDateType.value ==  3 && this.state.currentDateType.type == "month" ? "active" : "";
                                    dateTypeName = "三个月";
                                }else if(dateType.value == 6 && dateType.type == "month"){
                                    activeClass = this.state.currentDateType.value ==  6 && this.state.currentDateType.type == "month" ? "active" : "";
                                    dateTypeName = "半年";
                                }
                                return <a key={dateType.value} className={`btn btn-default ${activeClass}`} href="javascript:;" data-value={dateType.value} data-type={dateType.type} onClick={this.changeDateType}>{dateTypeName}</a>
                            })
                        }
                        </span>
                    </h3>
                    <ul className="order_info clearfix">
                        {
                            countOrderGoldTypeList.map((countOrderGoldType, index) => {
                                return <li key={countOrderGoldType['GoldTypeItemId']}>
                                    <span className="title">{countOrderGoldType['GoldTypeItemName'] || ''}</span>
                                    <span className="title">{countOrderGoldType['GoldWeight'] }g（{countOrderGoldType['Num']} 件）</span>
                                </li>
                            })
                        }
                    </ul>
                    <div className="order_chart" id="chart">
                        <Chart renderer={this.state.renderer} option={this.getOption()} />
                    </div>
                </div>
                <ul className="navbar_footer clearfix">
                    <li>
                        <a href="">
                            <img src={require("../../../assets/images/clerkManager_icon.png")} alt="" />
                            <p>店员管理</p>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <img src={require("../../../assets/images/helpCenter_icon.png")} alt="" />
                            <p>帮助中心</p>
                        </a>
                    </li>
                </ul>  
            </div>
        )
    }
}

export default connect(
    state => ({
        memberData: state.memberData,
        orderData: state.orderData,
    }),{
        getCountOrderGoldTypeList,
        getCountProduct,
        getCountOrderNums
    }
)(ManagerIndex);