import React from 'react';
import {Link, Switch, Route, withRouter }   from 'react-router-dom';
import Sider from './sider/index.jsx';
import { logout } from '../../utils/index.js';

import './index.scss'

class Member extends React.Component{
    constructor(props){
        super(props);
    }

    logout = () => {
        let _this = this;
        logout(function(data){
            if (data.success) {
                _this.props.history.push('/Login/Index');
            }
        });
    }
    render(){
        return (
            <div>
                <header>
                    <div className="navbar">
                        <img className="headerLogo_bg" src={ require('./../../assets/images/headerLogo_bg.png') } alt="" />
                        <span className="title">管理中心</span>
                        <Link to="/" className="logo" >
                            <img src={ require('./../../assets/images/proList_logo.png') } alt="" />
                        </Link>
                        <ul className="navbar_right">
                            <li>
                                <Link to="/Cart/Index" >
                                    <img src={ require('./../../assets/images/managercart_icon.png') } alt="" />
                                </Link>
                            </li>
                            <li>
                                <a href="javascript:;" onClick={this.logout}>
                                    <img src={ require('./../../assets/images/exit_iocn.png') } alt="" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </header>
                <div className='main'>
                    <Sider />
                    <div className="main_content"> 
                        { this.props.children }
                    </div>
                </div>
            </div>
            
        )
    }
}

export default withRouter(Member);