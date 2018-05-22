import React from 'react';

import { Modal } from 'antd'

import './index.scss';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            proChannelList: [
                {
                    channelId: 1,
                    channelName: 'kantuxianhuo',
                    imgSrc: './images/看图订货@2x.png'
                },
                {
                    channelId: 2,
                    channelName: 'kongtuoxianhuo',
                    imgSrc: './images/空托现货@2x.png'
                },
                {
                    channelId: 3,
                    channelName: 'sujinxianhuo',
                    imgSrc: './images/素金现货@2x.png'
                },
                {
                    channelId: 4,
                    channelName: 'luoshizhongxin',
                    imgSrc: './images/裸钻中心@2x.png'
                },
                {
                    channelId: 5,
                    channelName: 'xianqianxianhuo',
                    imgSrc: './images/镶嵌现货@2x.png'
                }
            ]
        }
    }

    componentWillMount(){
        document.title = '首页';
    }

    componentDidMount(){
        this.loadChannelList();
    }
    loadChannelList(){

    }

    viewProductList (e) {
        var targrt = e.currentTarget;
        var channelId = targrt.getAttribute('data-channelid');
        var channelName = targrt.getAttribute('data-channelname');
        window.location.href = "./productList.html?channelName=" + channelName;
        e.stopPropagation();
        e.preventDefault();
    }

    render(){
        return (
            <div id="index">
                <header >
                    <img src={require('./images/index_header.png')} className="logo" alt="" />
                </header>
                <section>
                    <ul className="proChannel_box" id="proChannel_box">
                        {
                            this.state.proChannelList.map((proChannel, index)=>{
                                return(
                                    <li key={proChannel.channelId}>
                                        <a className="proChannel_btn" href="javascript:;" data-channelid={proChannel.channelId} data-channelname={proChannel.channelName} onClick={(e) =>this.viewProductList(e)}>
                                            <img src={require(`${proChannel.imgSrc}`)} alt="" />
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                   
                </section>
                <footer>
                    <ul className="channel_box">
                        <li>
                            <a href="">
                                <img src={require('./images/home_find_n@2x.png')} alt="" />
                                <p>发现</p>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src={require('./images/home_cart_n@2x.png')} alt="" />
                                <p>购物车</p>
                            </a>
                        </li>
                        <li>
                            <a href="">
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

export default Home;