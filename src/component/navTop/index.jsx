import React from 'react';

class NavTop extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="navbar">
                { this.props.children}
            </div>
        )
    }
}
export default NavTop;