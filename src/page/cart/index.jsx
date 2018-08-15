import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCartList } from '../../store/cart/active.js';
import './index.scss';


class Cart extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.getCartList();
    }

    render(){
        const cartList = this.props.cartData.cartList
        return (
            <div className="cart">
                <header>
                    <div className="navbar">
                        <img className="headerLogo_bg" src='http://xd.zbs6.com/Content/images/headerLogo_bg.png' alt="" />
                        <span className="title" id="channelTitle">购物车</span>
                        <Link to="/" className="logo">
                            <img src={require('../../assets/images/proList_logo.png')} alt="" />
                        </Link>
                        <ul className="navbar_right">
                            <li>
                                <a href="javascript:;">清空搜索条件</a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <img src={require('../../assets/images/proSearch_icon.jpg')} alt="" />
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <img src={require('../../assets/images/proCart_icon.jpg')} alt="" />
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <img src={require('../../assets/images/proCollect_icon.jpg')} alt="" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </header> 
                <section>
                    <ul id="cartList" className="cart_list">
                        {
                            cartList.map(function(item, index){
                                const cartData = item['cartData'] || [];
                                
                            })
                        }
                    </ul>
                </section>
                <footer>
                    <div className="footer clearfix">
                        <div className="fl clearfix">
                            <div className="ckeckAll cartCheckAll">
                                <input type="checkbox" />
                                <i className="iconfont icon-checkbox"></i>
                                <span className="text">全选</span>
                            </div>
                            <a href="javascript:;" className="removeAll_btn">删除</a>
                        </div>
                        <div class="fr">
                            <a href="javascript:;" className="addCart_btn">去结算(<span id="totalQuantity">0</span>)</a>
                        </div>
                    </div>
                </footer>   
            </div>
            
        )
    }
}

export default connect(
    state => ({
        cartData: state.cartData
    }),{
        getCartList
    }
)(Cart);