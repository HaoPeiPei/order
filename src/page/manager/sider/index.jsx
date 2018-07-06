import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './index.scss';

class Sider extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <ul className="managerChana_nav pl">
                <li>
                    <NavLink activeClassName='active' to='/member/index'>我的管理</NavLink>
                </li>
                <li className="order">
                    <NavLink activeClassName='active' to='/order/index'>我的订单</NavLink>
                    <ul className="order_state">
                        <li>
                            <a href="">
                                待审核
                            </a>
                            <i className="iconfont icon-arrow-right"></i>
                        </li>
                        <li>
                            <a href="">
                                待配货
                            </a>
                            <i className="iconfont icon-arrow-right"></i>
                        </li>
                        <li>
                            <a href="">
                                待结算
                            </a>
                            <i className="iconfont icon-arrow-right"></i>
                        </li>
                        <li>
                            <a href="">
                                待发货
                            </a>
                            <i className="iconfont icon-arrow-right"></i>
                        </li>
                        <li>
                            <a href="">
                                待收货
                            </a>
                            <i className="iconfont icon-arrow-right"></i>
                        </li>
                        <li>
                            <a href="">
                                全部订单
                            </a>
                            <i className="iconfont icon-arrow-right"></i>
                        </li>
                    </ul>
                </li>
                <li>
                    <NavLink activeClassName='active' to='/stat'>我的统计</NavLink>
                </li>
                <li>
                    <NavLink activeClassName='active' to='/clerk'>我的店员</NavLink>
                </li>
                <li>
                    <NavLink activeClassName='active' to='/personInfo'>个人信息</NavLink>
                </li>
                <li>
                    <NavLink activeClassName='active' to='/help'> 帮助中心 </NavLink>
                </li>
            </ul>
        )
    }
}

export default Sider;