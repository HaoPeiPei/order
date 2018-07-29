import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './index.scss';

class Sider extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <ul className="managerChana_nav">
                <li>
                    <NavLink activeClassName='active' to='/member/index'>我的管理</NavLink>
                </li>
                <li className="order">
                    <NavLink activeClassName='active' to='/order/index'>我的订单</NavLink>
                </li>
                <li>
                    <NavLink activeClassName='active' to='/member/members'>我的店员</NavLink>
                </li>
                <li>
                    <NavLink activeClassName='active' to='/member/info'>个人信息</NavLink>
                </li>
                <li>
                    <NavLink activeClassName='active' to='/member/help'> 帮助中心 </NavLink>
                </li>
            </ul>
        )
    }
}

export default Sider;