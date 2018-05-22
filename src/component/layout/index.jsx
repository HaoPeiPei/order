import React from 'react';

import './index.scss';

class Layout extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div id="wrapper">
                {this.props.children}
            </div>

        );
    }
}
export default Layout; 