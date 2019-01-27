import React from 'react';
import {Route, Switch, Redirect, withRouter } from 'react-router-dom';

class AuthRouter extends React.Component{
    constructor(props){
        super(props)
    }
    render() {
        const { component: Component } = this.props;
        return (
          <Route render={props => {
            return  false 
                        ? <Component {...props} />
                        : <Redirect to="/login/index" />
                  }} />
        )
      }

}

export default AuthRouter;