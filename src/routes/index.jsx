import React from 'react';
import {Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Loadable from 'react-loadable';

import Loading from '../component/loading/index.jsx';
import Member from '../page/member/index.jsx';
import '../css/font/iconfont.css';
import '../css/reset.scss';
import '../css/theme.scss';
//import Login from '../page/login/index.jsx';

const asyncHome = Loadable({loader: () => import('../page/home/index.jsx'), loading: Loading});
const asyncLogin = Loadable({loader: () => import('../page/login/index.jsx'), loading: Loading});
const asyncProduct = Loadable({loader: () => import('../page/product/index.jsx'), loading: Loading})
const asyncManagerIndex = Loadable({loader: () => import('../page/member/index/index.jsx'), loading: Loading});
const asyncOrderIndex = Loadable({loader: () => import('../page/order/index/index.jsx'), loading: Loading});
const asyncInfo = Loadable({loader: () => import('../page/member/info/index.jsx'), loading: Loading});
const asyncMembers = Loadable({loader: () => import('../page/member/members/index.jsx'), loading: Loading});


class Routes extends React.Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path='/' component={asyncHome}  />
                    <Route exact path="/login"  component={asyncLogin} />
                    <Route path='/product/:channelName' component={ asyncProduct } />
                    <Member>
                        <Switch>
                            <Route path="/member/index" component={ asyncManagerIndex } />
                            <Route path="/order/index" component={ asyncOrderIndex } />
                            <Route path="/member/info" component={ asyncInfo } />
                            <Route path="/member/members" component={ asyncMembers } />
                        </Switch>
                    </Member>
                </Switch>
            </Router>
        )
    }
}

export default Routes;