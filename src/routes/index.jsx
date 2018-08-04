import React from 'react';
import {Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Loadable from 'react-loadable';

import navTop from '../component/navTop/index.jsx';
import Home from '../page/home/index.jsx';
import Product from '../page/product/index.jsx';
import Member from '../page/member/index.jsx';

import ManagerIndex from '../page/member/index/index.jsx';
import OrderIndex from '../page/order/index/index.jsx';
import Info from '../page/member/info/index.jsx';
import Members from '../page/member/members/index.jsx';
import '../css/font/iconfont.css';
import '../css/reset.scss';
import '../css/theme.scss';
import Login from '../page/login/index.jsx';

const getHomePage = Loadable({
        loader: () => import('../page/home/index.jsx'),
        loading() {
            return <div></div>
        } 
    })


class Routes extends React.Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path='/' getComponent={getHomePage}  />
                    <Route exact path="/login"  component={Login} />
                    <Route path='/product/:channelName' component={ Product } />
                    <Member>
                        <Switch>
                            <Route path="/member/index" component={ ManagerIndex } />
                            <Route path="/order/index" component={ OrderIndex } />
                            <Route path="/member/info" component={ Info } />
                            <Route path="/member/members" component={ Members } />
                        </Switch>
                    </Member>
                </Switch>
            </Router>
        )
    }
}

export default Routes;