import React from 'react';
import {Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import navTop from '../component/navTop/index.jsx';
import Home from '../page/home/index.jsx';
import Product from '../page/product/index.jsx';
import Manager from '../page/manager/index.jsx';

import ManagerIndex from '../page/manager/index/index.jsx';
import Order from '../page/manager/order/index.jsx';
import '../css/font/iconfont.css';
import '../css/reset.scss';
import '../css/theme.scss';
import Login from '../page/login/index.jsx';

class Routes extends React.Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path='/' component={ Home } />
                    <Route exact path="/login"  component={Login} />
                    <Route path='/product/:channelName' component={ Product } />
                    <Manager>
                        <Switch>
                            <Route exact path="/member/index" component={ ManagerIndex } />
                            <Route path="/order/index" component={ Order } />
                        </Switch>
                    </Manager>
                </Switch>
            </Router>
        )
    }
}

export default Routes;