import React from 'react';
import {Route, Switch, Redirect, withRouter, BrowserRouter as Router } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '../component/loading/index.jsx';
import LayoutRouter from './layoutRouter.jsx';
import AuthRouter from './authRouter.jsx';
import Error from '../page/error/index.jsx';
import '../css/font/iconfont.css';
import '../css/reset.scss';
import '../css/theme.scss';

const asyncLogin = Loadable({loader: () => import('../page/login/index.jsx'), loading: Loading});


class Routes extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Router>
                <Switch>
                   {/*  <Route path='/login/index' component={asyncLogin} />                     
                    <AuthRouter path='/' component={LayoutRouter} /> */}
                    <Route path='/login/index' component={asyncLogin} />
                    <Route path='/' component={LayoutRouter} />
                </Switch>
            </Router>
        )
    }
}

export default Routes;