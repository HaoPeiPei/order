import React from 'react';
import { connect } from 'react-redux';
import IEcharts from 'react-echarts-v3';
import { getCountOrderGoldTypeList, getCountProduct } from '../../../store/member/active.js';

import './index.scss';

const option = {
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
      data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    },
    yAxis: {},
    series: [{
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }]
  };

class ManagerIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            countOrderGoldTypeParam: {
                value: 1,
                type: "month"
            },
            countProductOption: {
                tooltip : {
                    trigger: 'axis',
                    position: function (pt) {
                        return [pt[0], '10%'];
                    }
                },
                toolbox: {
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {}
                    }
                },
                //布局设置，类似于margin
                grid: {
                    left: '3%',
                    right: '2%',
                    bottom: '10%',
                    containLabel: true
                },
                //X轴数据设置dateArray
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : []
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                //大面积折线图最下面的伸拉条设置，展示30天数据
                dataZoom: [
                    {
                        type: 'inside',
                        start: 0,
                        end: 30
                    }, {
                        start: 0,
                        end: 30, handleSize: '80%',
                        handleStyle: {
                            color: '#fff',
                            shadowBlur: 3,
                            shadowColor: 'rgba(0, 0, 0, 0.6)',
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        }
                    }
                ],
                //折线图图标和线条设置以及Y轴数据设置rateArray
                series : [
                    {
                        name:'转化率',
                        type:'line',
                        stack: '总量',
                        symbol:'star',//节点性状
                        itemStyle:{
                            normal:{
                                color: "#278BDD" //图标颜色
                            }
                        },
                        lineStyle:{
                            normal:{
                                width:3,  //连线粗细
                                color: "#278BDD"  //连线颜色
                            }
                        },
                        data:[]
                    }
                ]
            }

        }
    }

    componentDidMount(){
        this.props.getCountOrderGoldTypeList(this.state.countOrderGoldTypeParam);
        this.props.getCountProduct(this.state.countOrderGoldTypeParam);
    }

    render(){
        const countOrderGoldTypeList = this.props.memberData.countOrderGoldTypeList;
        //const countProduct = this.props.memberData.countProduct;
        return (
            <div className="managerIndex">
                <p className="notice">
                    <img src="../Content/images/notice_icom.png" alt="" />
                    <span className="notice_info">最新消息：受广大客户要求，新系统上线所有配货补货模块里面的工费满1000减500</span>
                </p>
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
                <ul className="order_state clearfix">
                    <li>
                        <a href="">
                            <img src="../Content/images/audit_icon.png" alt=""  />
                            <span>待审核</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <img src="../Content/images/distribution_icon.png" alt=""  />
                            <span>待配货</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <img src="../Content/images/account_icon.png" alt="" />
                            <span>待结算</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <img src="../Content/images/shipments_icon.png" alt="" />
                            <span>待发货</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <img src="../Content/images/receiving_icon.png" alt="" />
                            <span>待收货</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <img src="../Content/images/all Orders_icon.png" alt=""  />
                            <span>全部订单</span>
                        </a>
                    </li>
                </ul>
                <div className="orders_received">
                    <h3 className="title_wrap">  
                        <span className="title">订单统计</span>
                        <span className="dayList btn-group">
                            <a className="btn btn-default active" href="javascript:;" >一周</a>
                            <a className="btn btn-default" href="javascript:;">一个月</a>
                            <a className="btn btn-default" href="javascript:;">三个月</a>
                            <a className="btn btn-default" href="javascript:;">半年</a>
                        </span>
                    </h3>
                    <ul className="order_info clearfix">
                        {countOrderGoldTypeList.map((countOrderGoldType, index) => {
                            return <li key={countOrderGoldType['GoldTypeItemId']}>
                                <span className="title">{countOrderGoldType['GoldTypeItemName'] || ''}</span>
                                <span className="title">{countOrderGoldType['GoldWeight'] }g（{countOrderGoldType['Num']} 件）</span>
                            </li>
                        })}
                    </ul>
                    <div className="chart">
                        <IEcharts option={option}/>
                        {/* <IEcharts option={this.state.countProductOption}/> */}
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
        memberData: state.memberData
    }),{
        getCountOrderGoldTypeList,
        getCountProduct
    }
)(ManagerIndex);