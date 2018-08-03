import React from 'react';
import './index.scss';

import Gold from './gold/index.jsx'

class Detail extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const modalName = this.props.modalName;
        if(modalName == 'Gold'){
            return (
                <Gold  />    
            )
        }
    }
}

export default Detail;
