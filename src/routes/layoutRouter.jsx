import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import navTop from '../component/nav-top/index.jsx';
import Home from '../page/home/index.jsx';
import '../css/reset.scss';
import '../css/theme.css';
class LayoutRouter extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Router>
                <React.Fragment>
                    <main id="wrapper">
                        <Switch>
                            <Route exact path='/' component={ Home } />
                        </Switch>
                    </main>
                </React.Fragment>
            </Router> 
        )
    }
}


export default LayoutRouter;