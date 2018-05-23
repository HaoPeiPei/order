import React from 'react';
import {Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import Login from '../page/login/index.jsx';
import LayoutRouter from './layoutRouter.jsx'; 

class Routes extends React.Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path="/login"  component={Login} />
                    <Route path="/"  component={LayoutRouter} />
                </Switch>
            </Router>
        )
    }
}

export default Routes