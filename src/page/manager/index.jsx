import React from 'react';
import {Link, Switch, Route }   from 'react-router-dom';

import PageTitle from '../../component/pageTitle/index.jsx';
import Sider from './sider/index.jsx';

import './index.scss'

class Manager extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <PageTitle />
                <div className='main'>
                    <Sider />
                    { this.props.children }
                </div>
            </div>
            
        )
    }
}

export default Manager;