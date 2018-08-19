import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { message, Modal } from 'antd';
import ProductImg from '../../component/productImg/index.jsx';
import { getCartList, removeCart } from '../../store/cart/active.js';
import { checkArray, remove, save, request } from'../../utils/index.js';
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
            totalQuantity: 0,
            imageProps: {
                visible : false,
            }
        }
    }

    componentDidMount(){
        //获取购物车列表数据
        this.props.getCartList();
    }

    //单击选中频道和成色下的商品
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

    //单击选中商品
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

    //显示或隐藏列表
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

    //全选购物车商品
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

    //商品数量减少
    quantityRemove = (e) => {
        e.stopPropagation();
        let target = e.currentTarget;
        let $quantity = $(target).next('.quantity');
        let value = parseInt($quantity.val()) - 1;
        if(value < 1) return 
        $quantity.val(value);
        this.editCart(e)
    }

    //商品数量增加
    quantityAdd = (e) => {
        e.stopPropagation();
        let target = e.currentTarget;
        let $quantity = $(target).prev('.quantity');
        let value = parseInt($quantity.val()) + 1;
        $quantity.val(value);
        this.editCart(e)
    }

    //修改商品备注和数量
    editCart = (e) =>{
        e.stopPropagation();
        let target = e.currentTarget;
        let $tr = $(target).parents('tr');
        let cartId = $tr.attr('data-cartid');
        let $message = $tr.find('input[name="message"]');
        let $quantity = $tr.find('input[name="quantity"]');
        let quantity = parseInt($quantity.val());
        $quantity.val(quantity)
        if(quantity < 1) return 
        let postDate = {
            "CartId": cartId,
            "cart": {
                "Message": $message.val(),
                "Quantity": quantity
            }
        };
        save({
            url: `/Cart/EditCart`,
            data: postDate,
            callBack: (data) => {
                if (data.success) {
                    message.success('修改成功');
                } else {
                    message.error('修改失败');
                }
            }
        })
    }

    //清空购物车
    removeAll = (e) => {
        e.stopPropagation();
        let selected = $('#cartList').find('input[type="checkbox"]:not(.checkAll):checked').parents('tr');
        let cartIds = $.map(selected, function (item, index) {
            return $(item).attr('data-cartid');
        });
        checkArray(cartIds) &&  remove({
            utl: `/Cart/BatchDeleteCart`,
            data: {'cartIds': cartIds},
            callBack: (data) => {
                if (data.success) {
                    message.success(data.Message || '删除成功');
                    debugger
                    this.props.getCartList();
                } else {
                    message.error(data.Message || '删除失败');
                }
            }
        });  
    }

    //单个删除购物车
    removeSingle = (e) => {
        e.stopPropagation();
        let cartId = e.currentTarget.getAttribute('data-cartid');
        remove({
            url: '/Cart/DeleteCart',
            data: {
                "CartId": cartId
            },
            callBack: (data) => {
                if (data.success) {
                    message.success(data.Message || '删除成功');
                    this.props.getCartList()
                } else {
                    message.error(data.Message || '删除失败');
                }
            }
        })
    }

    //查看图片
    viewImg = (e) => {
        e.stopPropagation();
        let target = e.currentTarget;
        let $table = $(target).parents("table");
        let imageProps = {
            title: "查看图片",
            width: "600px",
            height: "600px",
            imgUrl: $(target).find("img").length > 0 ? $(target).find("img").attr("src").split("?")[0] : '',
            hideModal: () => {
                this.setState({
                    imageProps: Object.assign({}, this.state.imgProps, {
                        visible: false 
                    })
                })
            }
        }
        if($table.hasClass("Gold")){
            imageProps = Object.assign({}, imageProps, {
                rect: {
                    x: $(target).find("img").attr("data-x"),
                    y: $(target).find("img").attr("data-y"),
                    w: $(target).find("img").attr("data-w"),
                    h: $(target).find("img").attr("data-h"),
                },
                productImgUrl: $(target).find("img").attr("data-productImgUrl").split("?")[0],
                markNum: $(target).find("img").attr("data-marknum"),
                width: "1000px",
                height: "85%",
            });
        }
        this.setState({
            imageProps: Object.assign({}, imageProps, {
                visible: true    
            })
        },()=>{
            console.log(this.state.imageProps)
        })
    };

    //去结算
    addOrder = () => {
        var selected = $('#cartList').find('input[type="checkbox"]:not(.checkAll):checked').parents('tr');
        var cartIds = $.map(selected, function (item, index) {
            return $(item).attr('data-cartId');
        });
        checkArray(cartIds) && request({
            url: '/Cart/ToSetOrder',
            data: { "text": '', "ids": cartIds.join(',') },
            callBack: () => {
                if (cartIds.length > 0) {
                    this.props.history.push(`/order/addOrder/${cartIds}`);
                }
            }
        })
        
    }

    //判断频道
    switchChnanel = (channelId) => {
        switch(channelId){
            case  Gold:
                return {
                    channelName: 'Gold'
                }
                break;
            case  Stone:
                return {
                    channelName: 'Stone'
                }
                break;
            case  Inlay1:
                return {
                    channelName: 'Inlay1'
                }
                break;
            case  Inlay2:
                return {
                    channelName: 'Inlay2'
                }
                break;
            case  OutStock:
                return {
                    channelName: 'OutStock'
                }
                 break;
            case  Ring:
                return {
                    channelName: 'Ring'
                }
                 break;
        }
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
                                var channelName =  _this.switchChnanel(item['ChannelId'])["channelName"]; 
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
                                            <table className={`table ${channelName}`}>
                                                <tbody>
                                                    {
                                                        cartData.length > 0 
                                                            ? cartData.map(function(cart, index){
                                                                let markCoordinate = cart['MarkCoordinate'] && JSON.parse(cart['MarkCoordinate']);
                                                                return <tr key={cart['CartId']} data-cartid={cart['CartId']}>
                                                                            <td style={{width:70, textAlign:'center'}}>{cart['EnabledMark'] == 0 ? <span>失效</span>: <div onClick={_this.check} className="checkbox"><input type="checkbox" /><i className="iconfont icon-checkbox"></i></div> }</td>
                                                                            <td style={{width:110, overflow:'hidden'}}>
                                                                                <a className="viewImg_btn" href="javascript:;" onClick={_this.viewImg}  >
                                                                                <img data-marknum={cart.MarkNum} data-productimgurl={cart.ProductImgUrl} src={cart.ImgUrl} 
                                                                                    data-x={markCoordinate && markCoordinate['x']} 
                                                                                    data-y={markCoordinate && markCoordinate['y']} 
                                                                                    data-w={markCoordinate && markCoordinate['w']}
                                                                                    data-h={markCoordinate && markCoordinate['h']} /> 
                                                                                </a>
                                                                            </td>
                                                                            <td style={{paddingTop: 10, textAlign:'left'}}>
                                                                                <p><span>{cart.Title}</span>&nbsp;&nbsp;{!cart.GoodsNo ? '' : <span>（款号：{cart.GoodsNo}）</span>}</p>
                                                                                <p><span>{cart.Parameter}</span></p>
                                                                                <p className="desc_box">备注：<input className="desc" type="text" name="message" defaultValue={cart.Message == null ? '' : cart.Message} onBlur={_this.editCart}/></p>
                                                                            </td>
                                                                            {
                                                                                !(item['ChannelId'] == Inlay2 || item['ChannelId'] == Stone || item['ChannelId'] == Ring) 
                                                                                    ?   (cart['Price'] 
                                                                                            ? <td valign="middle" style={{width:285, color:'#ff0000'}}>￥
                                                                                                <span className="price">{cart['Price']}</span>
                                                                                                <input type="hidden" defaultValue={cart['Quantity']} />
                                                                                                </td> 
                                                                                            : null)
                                                                                    :   null
                                                                                    
                                                                            }
                                                                            {
                                                                                !(item['ChannelId'] == Inlay2 || item['ChannelId'] == Stone || item['ChannelId'] == Ring)  
                                                                                    ?   <td style={{width:285}}>
                                                                                            <div className="quantity_box">
                                                                                                <i className="iconfont icon-jian" onClick={_this.quantityRemove}></i>
                                                                                                <input type="number" className="quantity" name="quantity" defaultValue={cart['Quantity']} onBlur={_this.editCart}/>
                                                                                                <i className="iconfont icon-jia" onClick={_this.quantityAdd}></i>
                                                                                            </div>
                                                                                        </td>                                                                                    
                                                                                    : null 
                                                                            }
                                                                            <td>
                                                                                <a href="javascript:;" onClick={_this.removeSingle} data-cartid={cart['CartId']} className="remove_btn btn btn-xs  btn-danger" >删除</a>
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
                            <a href="javascript:;" onClick={this.addOrder} className="addCart_btn">去结算(<span id="totalQuantity">{this.state.totalQuantity}</span>)</a>
                        </div>
                    </div>
                </footer>   
                {this.state.imageProps.visible && <ProductImg {...this.state.imageProps}/>}
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