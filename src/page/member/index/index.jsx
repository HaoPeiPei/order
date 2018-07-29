import React from 'react';

import './index.scss';

class ManagerIndex extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
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
                        <li>
                            <span className="title">足金999</span>
                            2544g（25件）
                        </li>
                        <li>
                            <span className="title">足金999.9</span>
                            2544g（25件）
                        </li>
                        <li>
                            <span className="title">足金999.99</span>
                            2544g（25件）
                        </li>
                        <li>
                            <span className="title">18K金</span>
                            2544g（25件）
                        </li>
                    </ul>
                    <div className="chart"></div>
                </div>
                <ul className="navbar_footer clearfix">
                    <li>
                        <a href="">
                            <img src="../../../assets/images/clerkManager_icon.png" alt="" />
                            <p>店员管理</p>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <img src="../../../assets/images/clerkManager_icon.png" alt="" />
                            <p>我的关注</p>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <img src="../../../assets/images/clerkManager_icon.png" alt="" />
                            <p>帮助中心</p>
                        </a>
                    </li>
                </ul>  
            </div>
        )
    }
}

export default ManagerIndex;