import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getBrand } from '../../store/home/active.js';

import './index.scss';


class Home extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        document.title = '首页';
    }

    componentDidMount(){
        this.props.getBrand();
    }

    render(){
        const brandData = this.props.homeData.brandData || {};
        const channelList = brandData['Channel'] || [];
        
        return (
            <div id="index">
                <header >
                    <img src={brandData['LogoImg']||require('./images/index_header.png')} className="logo" alt="" />
                </header>
                <section>
                    <ul className="proChannel_box" id="proChannel_box">
                        {
                            channelList.map((channel, index)=>{
                                if(channel['ChannelId'] == '53ebef4e-1038-407b-88e8-09d230e2dd52'){
                                    return(
                                        <li className="productChnanel_item" key={channel['ChannelId']}>
                                            <Link to={`/product/Gold`} className="proChannel_btn">
                                                <img src={channel['ImgUrlWeb'] || require(`./images/素金现货@2x.png`)} alt="" />
                                            </Link>
                                        </li>
                                    )
                                }else if(channel['ChannelId'] == '8045c89a-c242-4fad-b077-5e65ce78e94b'){
                                    return(
                                        <li className="productChnanel_item" key={channel['ChannelId']}>
                                            <Link to={`/product/OutStock`} className="proChannel_btn">
                                                <img src={channel['ImgUrlWeb'] || require(`./images/看图订货@2x.png`)} alt="" />
                                            </Link>
                                        </li>
                                    )
                                }else if(channel['ChannelId'] == 'f0ca235d-5539-4e31-b256-2a2e0cf4bf7f'){
                                    return(
                                        <li className="productChnanel_item" key={channel['ChannelId']}>
                                            <Link to={`/product/Inlay1`} className="proChannel_btn">
                                                <img src={channel['ImgUrlWeb'] || require(`./images/镶嵌现货@2x.png`)} alt="" />
                                            </Link>
                                        </li>
                                    )
                                }else if(channel['ChannelId'] == '0e77c6ca-4a31-404f-b5ad-18882a2f15d0'){
                                    return(
                                        <li className="productChnanel_item" key={channel['ChannelId']}>
                                            <Link to={`/product/Inlay2`} className="proChannel_btn">
                                                <img src={channel['ImgUrlWeb'] || require(`./images/镶嵌现货@2x.png`)} alt="" />
                                            </Link>
                                        </li>
                                    )
                                }
                            }) 
                        }
                    </ul>
                   
                </section>
                <footer>
                    <ul className="memberChnanel_list">
                        <li className="memberChnanel_item">
                            <a href="/Cart/Index">
                                <img src={require('./images/home_cart_n@2x.png')} alt="" />
                                <p>购物车</p>
                            </a>
                        </li>
                        <li className="memberChnanel_item">
                            <a href="/Member/Index">
                                <img src={require('./images/home_member_n@2x.png')} alt="" />
                                <p>管理</p>
                            </a>
                        </li>
                    </ul>
                </footer>
            </div>
        )
    }
}

export default connect(
    state =>({ 
        homeData: state.homeData
    }),{
        getBrand
    }
)(Home);