import React from 'react';
import './index.scss';

import Gold from './gold/index.jsx';
import OutStock from './outStock/index.jsx';
import Inlay1 from './inlay1/index.jsx';
import Inlay2 from './inlay2/index.jsx';

class Detail extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const modalName = this.props.modalName;
        if(modalName == 'Gold'){
            return (
                <Gold  {...this.props}/>    
            )
        }else if(modalName == 'OutStock'){
            return (
                <OutStock  {...this.props}/>    
            )
        }else if(modalName == 'Inlay1'){
            return (
                <Inlay1  {...this.props}/>    
            )
        }else if(modalName == 'Inlay2'){
            return (
                <Inlay2  {...this.props}/>    
            )
        }
    }
}

export default Detail;
