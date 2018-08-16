import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { message, Modal } from 'antd';
import { getCartList, removeCart } from '../../store/cart/active.js';
import { checkArray } from'../../utils/index.js';
import './index.scss';

const confirm = Modal.confirm;
const Gold = '53ebef4e-1038-407b-88e8-09d230e2dd52';
const Stone = '9ee97263-e7a0-4190-ac7c-c42df4ab4c54';
const Inlay1 = 'f0ca235d-5539-4e31-b256-2a2e0cf4bf7f';
const Inlay2 = '0e77c6ca-4a31-404f-b5ad-18882a2f15d0';
const OutStock = '8045c89a-c242-4fad-b077-5e65ce78e94b';
const Ring = '752011f1-b6ff-43c6-9a80-380b95d95546';

class Cart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            totalQuantity: 0
        }
    }

    componentDidMount(){
        this.props.getCartList();
    }

    editCart = () =>{

    }

    checkAll = (e) =>{
        e.stopPropagation();
        let target = e.currentTarget;
        setTimeout(() => {
            let $input = $(target).find('input[type="checkbox"]');
            let $table = $(target).parents('.title').next('table');
            $input.prop('checked', !$input.prop('checked'));
            let checked = $input.prop('checked') ? true : false;
            $.each($table.find('input[type="checkbox"]'), function (index, item) {
                $(item).prop('checked', checked);
            });
            this.setState({
                totalQuantity: this.computeQuantity()
            })
        }, 0);
    }

    check = (e) => {
        e.stopPropagation();
        let target = e.currentTarget;
        setTimeout(() => {
            let $table = $(target).parents('table');
            let $checkAll = $table.prev('.title').find('input[type="checkbox"]');
            let $input = $(target).find('input[type="checkbox"]');
            $input.prop('checked', !$input.prop('checked'));
            if ($table.find('tr').length == $table.find('input[type="checkbox"]:checked').length) {
                $checkAll.prop('checked', true);
            } else {
                $checkAll.prop('checked', false);
            }
            this.setState({
                totalQuantity: this.computeQuantity()
            },()=>{
                console.log(this.computeQuantity());
            })
        }, 0);
    }

    toggle = (e) => {
        e.stopPropagation();
        let target = e.currentTarget;
        if ($(target).hasClass("open")) {
            $(target).parents(".title").next().show();
            $(target).removeClass("open");
        } else {
            $(target).parents(".title").next().hide();
            $(target).addClass("open");
        }
    }

    cartCheckAll = (e) => {
        e.stopPropagation();
        let target = e.currentTarget;
        setTimeout(() => {
            let $input = $(target).find('input[type="checkbox"]');
            $input.prop('checked', !$input.prop('checked'));
            let checked = $input.prop('checked') ? true : false;
            $.each($('#cartList').find('input[type="checkbox"]'), function (index, item) {
                $(item).prop('checked', checked);
            });
            this.setState({
                totalQuantity: this.computeQuantity()
            })
        }, 0);
    }

    removeAll = () => {
        let _this = this;
        let selected = $('#cartList').find('input[type="checkbox"]:not(.checkAll):checked').parents('tr');
        let cartIds = $.map(selected, function (item, index) {
            return $(item).attr('data-cartid');
        });
        checkArray(cartIds) && confirm({
            title: '信息',
            okText: '确认',
            content: '注：您确定要删除吗？该操作将无法恢复。',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                removeCart(
                    {
                        data: {'cartIds': cartIds},
                        callBack: (data) => {
                            if (data.success) {
                                message.success(data.Message || '删除成功');
                                debugger
                                _this.props.getCartList();
                            } else {
                                message.error(data.Message || '删除失败');
                            }
                        }
                    }
                )
            }
        });
    }

    //计算购物车数量
    computeQuantity = () => {
        var totalQuantity = 0;
        var $checked = $('#cartList table').find('input[type="checkbox"]:checked');
        $.each($checked, function (index, item) {
            var value = $(item).parents('tr').find('input[name="quantity"]').val();
            if (!!value) {
                totalQuantity += parseInt(value);
            }
        });
        return totalQuantity;
    }



    render(){
        let _this = this;
        const cartList = this.props.cartData.cartList;
          
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
                                let cartData = item['CartData'];
                                return <li key={`${item['ChannelId']}`.concat(`${item['GoldTypeItemId']}`)} className="cart_item">
                                            <h3 className="title clearfix">
                                                <span className="fl info_left">
                                                    <div className="checkAll channelCheckAll" onClick={_this.checkAll}><input type="checkbox" /><i className="iconfont icon-checkbox"></i></div>
                                                    <span>{!!item.GoldTypeItemName ? `${item.GoldTypeItemName}-`: null}{item.ChannelName}</span>
                                                </span>
                                                <span className="fr info_right">
                                                    <span style={{marginRight: 5}}>{item.GoldTypeItemName || ''}</span>
                                                    <span style={{color: '#ffa500',marginRight: 5}}>{`（${item.Quantity}件）`}</span>
                                                    {item['ChannelId'] == Gold ? <span>总重 {item.GoldWeight}g-{item.GoldWeightB}g</span> : null}
                                                    <a href="javascript:;" onClick={_this.toggle} className="btn_goods_togger">
                                                        <i className="iconfont arrow "></i>
                                                    </a>
                                                </span>
                                            </h3>
                                            <table className="table">
                                                <tbody>
                                                    {
                                                        cartData.length > 0 
                                                            ? cartData.map(function(cart, index){
                                                                return <tr key={cart['CartId']} data-cartid={cart['CartId']}>
                                                                            <td style={{width:70, textAlign:'center'}}>{cart['EnabledMark'] == 0 ? <span>失效</span>: <div onClick={_this.check} className="checkbox"><input type="checkbox" /><i className="iconfont icon-checkbox"></i></div> }</td>
                                                                            <td style={{width:110, overflow:'hidden'}}>
                                                                                <a className="viewImg_btn" href="javascript:;" onClick={()=>{}}  >
                                                                                <img data-marknum={cart.MarkNum} data-productimgurl={cart.ProductImgUrl} data-markcoordinate-x={0} data-markcoordinate-y={0} data-markcoordinate-h={0} data-markcoordinate-w={0} src={cart.ImgUrl} />
                                                                                </a>
                                                                            </td>
                                                                            <td style={{paddingTop: 10, textAlign:'left'}}>
                                                                                <p><span>{cart.Title}</span>&nbsp;&nbsp;{!cart.GoodsNo ? '' : <span>（款号：{cart.GoodsNo}）</span>}</p>
                                                                                <p><span>{cart.Parameter}</span></p>
                                                                                <p className="desc_box">备注：<input className="desc" type="text" value={cart.Message == null ? '' : cart.Message} onChange={()=>{}}/></p>
                                                                            </td>
                                                                            {
                                                                                !(item['ChannelId'] == Inlay2 || item['ChannelId'] == Stone || item['ChannelId'] == Ring) 
                                                                                    ?   (cart['Price'] 
                                                                                            ? <td valign="middle" style={{width:285, color:'#ff0000'}}>￥
                                                                                                <span className="price">{cart['Price']}</span>
                                                                                                <input type="hidden" value={cart['Quantity']} onChange={()=>{}} />
                                                                                                </td> 
                                                                                            : null)
                                                                                    :   null
                                                                                    
                                                                            }
                                                                            {
                                                                                !(item['ChannelId'] == Inlay2 || item['ChannelId'] == Stone || item['ChannelId'] == Ring)  
                                                                                    ?   <td style={{width:285}}>
                                                                                            <div className="quantity_box">
                                                                                                <i className="iconfont icon-jian" onClick={()=>{}}></i>
                                                                                                <input type="number" className="quantity" name="quantity" value={cart['Quantity']} onChange={()=>{}}/>
                                                                                                <i className="iconfont icon-jia" onClick={()=>{}}></i>
                                                                                            </div>
                                                                                        </td>                                                                                    
                                                                                    : null 
                                                                            }
                                                                            <td>
                                                                                <a href="javascript:;" data-cartid={cart['CartId']} className="remove_btn btn btn-xs  btn-danger" >删除</a>
                                                                                {item['ChannelId'] != Stone || item['ChannelId'] != Ring ? <a href="javascript:;" data-cartid={cart['CartId']} data-productid={cart['ProductId']} data-channelid={item['ChannelId']} className="view_btn btn btn-xs  btn-success" >查看详情</a> : null}
                                                                            </td>
                                                                        </tr>
                                                            })
                                                            : null
                                                    }
                                                </tbody>
                                            </table>
                                        </li> 
                            })
                        }
                    </ul>
                </section>
                <footer>
                    <div className="footer clearfix">
                        <div className="fl clearfix">
                            <div className="ckeckAll cartCheckAll" onClick={this.cartCheckAll}>
                                <input type="checkbox" />
                                <i className="iconfont icon-checkbox"></i>
                                <h5 className="text"></h5>
                            </div>
                            <a href="javascript:;" onClick={this.removeAll} className="removeAll_btn">
                                <span className="text">删除</span>  
                            </a>
                        </div>
                        <div className="fr">
                            <a href="javascript:;" className="addCart_btn">去结算(<span id="totalQuantity">{this.state.totalQuantity}</span>)</a>
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