import React from 'react';
import {Route, Switch, Redirect, withRouter, BrowserRouter as Router } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '../component/loading/index.jsx';
import Member from '../page/member/index.jsx';
import '../css/font/iconfont.css';
import '../css/reset.scss';
import '../css/theme.scss';

const asyncHome = Loadable({loader: () => import('../page/home/index.jsx'), loading: Loading});
const asyncLogin = Loadable({loader: () => import('../page/login/index.jsx'), loading: Loading});
const asyncProduct = Loadable({loader: () => import('../page/product/index.jsx'), loading: Loading})
const asyncCart = Loadable({loader: () => import('../page/cart/index.jsx'), loading: Loading})
const asyncManagerIndex = Loadable({loader: () => import('../page/member/index/index.jsx'), loading: Loading});
const asyncOrderIndex = Loadable({loader: () => import('../page/order/index/index.jsx'), loading: Loading});
const asyncAddOrder = Loadable({loader: () => import('../page/order/addOrder/index.jsx'), loading: Loading});
const asyncInfo = Loadable({loader: () => import('../page/member/info/index.jsx'), loading: Loading});
const asyncMembers = Loadable({loader: () => import('../page/member/members/index.jsx'), loading: Loading});

 const MemberRouter =() => (
    <Member>
        <Switch>
            <Route path={`/member/index`} component={asyncManagerIndex} />
            <Route path={`/order/index/:orderState?`} component={asyncOrderIndex} />
            <Route path={`/member/info`} component={asyncInfo} />
            <Route path={`/member/members`} component={asyncMembers} />
        </Switch>
    </Member>
) 

const Routes = () => (
    <Router>
        <Switch>
            <Route path={`/`} exact component={asyncHome} />
            <Route path={`/login/index`} component={asyncLogin} /> 
            <Route path={`/product/:channelName`} component={asyncProduct} />
            <Route path={`/cart/index`} component={asyncCart} />
            <Route path={`/order/addOrder/:cartIds`} component={asyncAddOrder} />
            <MemberRouter />
        </Switch>
    </Router>
)

export default Routes;