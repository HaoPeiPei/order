import React from 'react';
import {Link, Switch, Route }   from 'react-router-dom';

import PageTitle from '../../component/pageTitle/index.jsx';
import Sider from './sider/index.jsx';

import './index.scss'

class Member extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <PageTitle />
                <div className='main'>
                    <Sider />
                    <div className="main_content"> 
                        { this.props.children }
                    </div>
                </div>
            </div>
            
        )
    }
}

export default Member;