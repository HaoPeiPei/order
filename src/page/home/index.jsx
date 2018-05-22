import React from 'react';

import './index.scss';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            channelList: [
                {
                    imgSrc: './images/看图订货@2x.png'
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

    render(){
        return (
            <div id="index">
                <header >
                    <img src={require('./images/index_header.png')} className="logo" alt="" />
                </header>
                <section>
                    <ul className="proChannel_box" id="proChannel_box">
                        {
                            this.state.channelList.map((channel, index)=>{
                                return(
                                    <li key={index}>
                                        <a className="proChannel_btn" href="javascript:;" data-channelId="1" data-channelName="kantudinghuo">
                                            <img src={require(`${channel.imgSrc}`)} alt="" />
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