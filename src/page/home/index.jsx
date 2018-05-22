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
                    {/* <ul className="proChannel_box" id="proChannel_box">
                        <li>
                            <a className="proChannel_btn" href="javascript:;" data-channelId="1" data-channelName="kantudinghuo">
                                <img src={require('./images/看图订货@2x.png')} alt="" />
                            </a>
                        </li>
                        <li>
                            <a className="proChannel_btn"  href="javascript:;" data-channelId="2" data-channelName="kongtuoxianhuo">
                                <img src={require('./images/空托现货@2x.png')} alt="" />
                            </a>
                        </li>
                        <li>
                            <a  className="proChannel_btn" href="javascript:;" data-channelId="3" data-channelName="luozuanzhongxin">
                                <img src={require('./images/裸钻中心@2x.png')} alt="" />
                            </a>
                        </li>
                        <li>
                            <a  className="proChannel_btn" href="javascript:;" data-channelId="4" data-channelName="sujinxianhuo">
                                <img src={require('./images/素金现货@2x.png')} alt="" />
                            </a>
                        </li>
                        <li>
                            <a  className="proChannel_btn" href="javascript:;" data-channelId="5" data-channelName="xiangqianxianhuo">
                                <img src={require('./images/镶嵌现货@2x.png')} alt="" />
                            </a>
                        </li>
                            
                    </ul> */}
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