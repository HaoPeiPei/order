import React from 'react';

import './index.scss';

class PageTitle extends React.Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        document.title=this.props.title ;
    }
    render(){
        return(
            <div className='header'>
                <div className="navbar">
                    <img className="headerLogo_bg" src={ require('../../assets/images/headerLogo_bg.png') } alt="" />
                    <span className="title">管理中心</span>
                    <a className="logo" href="./index.html">
                        <img src={ require('../../assets/images/proList_logo.png') } alt="" />
                    </a>
                    <ul className="navbar_right">
                        <li>
                            <a href="javascript:;" >
                                <img src={ require('../../assets/images/info_icon.png') } alt="" />
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;" >
                                <img src={ require('../../assets/images/managercart_icon.png') } alt="" />
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;" >
                                <img src={ require('../../assets/images/exit_iocn.png') } alt="" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
export default PageTitle; 