import React from 'react';
import { connect } from 'react-redux';
import { Icon, Switch, Button } from 'antd';
import classnames from 'classnames';
import { getSideBarData } from '../../store/home/active';

import Menus from '../menu/index.jsx';
import './sider.scss'

class Sider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            siderFold: false,
            darkTheme: false,   
            navOpenKeys: [],
        }
    }

    switchMenuPopover = () =>{

    };
     
    componentDidMount(){
        if(!this.props.homeData.sideBarList.length){
            this.props.getSideBarData();
        }
    }
    
    render(){
        const menusProps = {
            menu: this.props.homeData.sideBarList,
            siderFold: this.state.siderFold,
            location:{
                pathname: '/User/Index'
            },
            navOpenKeys: this.state.navOpenKeys,
            changeOpenKeys: (openKeys)=>{
                this.setState({
                    navOpenKeys: openKeys
                });
            },
          }

        return (
            <div className='ant-layout-sider'>
                <Button type="primary" onClick={this.switchMenuPopover} style={{ marginBottom: 16 }}>
                    <Icon type={classnames({ 'menu-unfold': this.state.siderFold, 'menu-fold': !this.state.siderFold })} />
                </Button>
                <Menus { ...menusProps }/> 
            </div>
        )
    }
}

export default connect(state => ({
    homeData: state.homeData,
}),{
    getSideBarData,    
})(Sider);