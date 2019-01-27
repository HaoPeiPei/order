import React from 'react';
import { Modal, message } from 'antd';
import { connect } from 'react-redux';
import { getListOrder, getOrderDetailData, editOrder, getCountOrderNums} from '../../../store/order/active.js';
import jQuery from 'jquery';
import ProductImg from '../../../component/productImg/index.jsx';
import './index.scss';

const confirm = Modal.confirm;
const Gold = '53ebef4e-1038-407b-88e8-09d230e2dd52';
const Stone = '9ee97263-e7a0-4190-ac7c-c42df4ab4c54';
const Inlay1 = 'f0ca235d-5539-4e31-b256-2a2e0cf4bf7f';
const Inlay2 = '0e77c6ca-4a31-404f-b5ad-18882a2f15d0';
const OutStock = '8045c89a-c242-4fad-b077-5e65ce78e94b';
const Ring = '752011f1-b6ff-43c6-9a80-380b95d95546';

class Detail extends React.Component{
    constructor(props){
        super(props)    
        this.state = {
            imageProps: {
                visible : false,
            }
        }  
    }
    componentDidMount(){
        this.props.getOrderDetailData(this.props.orderId);
    }

    //显示或隐藏列表
    toggle = (e) => {
        e.stopPropagation();
        let target = e.currentTarget;
        if (jQuery(target).hasClass("open")) {
            jQuery(target).parents(".title").next().show();
            jQuery(target).removeClass("open");
        } else {
            jQuery(target).parents(".title").next().hide();
            jQuery(target).addClass("open");
        }
    }

    //修改订单状态
    editOrderStatus = (e) => {
        let _this = this;
        const _stateName = e.target.getAttribute("data-name");
        const _state = e.target.getAttribute("data-status");
        const txt = e.target.innerHTML;

        const postData = {
            "OrderId": this.props.orderId,
            "StateName": _stateName, 
            "status": _state 
        }

        confirm({
            title: '信息',
            content: '注：你确定要更改订单状态吗？',
            onOk() {
                editOrder(postData, function(data){
                    if (data.success) {
                        let msg = data.message || "操作成功";
                        message.success(msg);
                        _this.props.getOrderDetailData(_this.props.orderId);
                        _this.props.getListOrder(_this.props.orderParam);
                        _this.props.getCountOrderNums();
                    } else {
                        let msg = data.message || "操作失败";
                        message.error(msg)
                    }
              });
            },
            onCancel() {},
          });
    }

    //查看图片
    viewImg = (e) => {
        e.stopPropagation();
        let target = e.currentTarget;
        let $table = jQuery(target).parents("table");
        let imageProps = {
            title: "查看图片",
            width: "600px",
            height: "600px",
            imgUrl: jQuery(target).find("img").length > 0 ? jQuery(target).find("img").attr("src").split("?")[0] : '',
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
                    x: jQuery(target).find("img").attr("data-x"),
                    y: jQuery(target).find("img").attr("data-y"),
                    w: jQuery(target).find("img").attr("data-w"),
                    h: jQuery(target).find("img").attr("data-h"),
                },
                productImgUrl: jQuery(target).find("img").attr("data-productImgUrl").split("?")[0],
                markNum: jQuery(target).find("img").attr("data-marknum"),
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

    render(){
        let _this = this;
        const orderDetail = this.props.orderData.orderDetail;
        const accept = orderDetail['Accept'];
        const state = orderDetail['State'];
        const orderHead = orderDetail['OrderHead'];
        const orderGoods = orderDetail['OrderGoods'] || [];
        return (
            <Modal {...this.props} 
                className="orderDetail"
            >
                <section>
                    <div id="address" className="address">
                        <img className="address_img" src="/Content/images/address_icon.jpg" alt="" />
                        {
                            accept && !!accept['AcceptProvince'] 
                                ?   <div className="accept_info">
                                        <p>{accept["AcceptName"]}&nbsp;&nbsp;&nbsp;&nbsp;{accept["AcceptMobile"]}</p>
                                        <p>{accept["AcceptProvinceName"]+accept["AcceptProvinceName"]+accept["AcceptCityName"]+accept["AcceptCountyName"]+accept["AcceptStreetName"]+(accept["AcceptAddress"] || '')}</p>
                                    </div>
                                :   <div className="accept_info">
                                        <p>客户自提</p>
                                        <p>客户不需要邮寄，自到供货商展厅取货</p>
                                    </div>
                        }
                    </div>
                    <div className="orderHead" id="orderHead">                    
                        <div className="orderHead_item">
                            <label className="title">下单人号码：</label>
                            <span className="text">{orderHead && orderHead["SellerTelphone"] || '无'}</span>
                        </div>
                        <div className="orderHead_item">
                            <label className="title">挂签<span >&nbsp;(足金9999)</span>：</label>
                            <span className="text">{orderHead && orderHead['GoldTag'] || "无"}</span>
                        </div>
                        <div className="orderHead_item">
                            <label className="title">字印：</label>
                            <span className="text">{orderHead && orderHead['Lettering'] || "无"}</span>                    
                        </div>
                        <div className="orderHead_item">
                            <label className="title">证书：</label>
                            <span className="text">{orderHead && orderHead['Certificate'] || "无"}</span>
                        </div>
                        <div className="orderHead_item">
                            <label className="title">备注：</label>
                            <span className="text">{orderHead && orderHead["Description"] || ''}</span>
                        </div>
                    </div>
                    <ul id="orderGoodList" className="orderGood_list">
                    {
                        orderGoods.map(function(item, index){
                            let orderGood = item['GoodsData'] || [];
                            var channelName =  _this.switchChnanel(item['ChannelId'])["channelName"]; 
                            return <li key={`${item['ChannelId']}`.concat(`${item['GoldTypeItemId']}`)} className="orderGood_item">
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
                                                    orderGood.length > 0 
                                                        ? orderGood.map(function(order, index){
                                                            let markCoordinate = order['MarkCoordinate'] && JSON.parse(order['MarkCoordinate']);
                                                            return <tr key={order['OrderEntryId']} data-id={order['OrderEntryId']}>
                                                                        <td style={{width:110, overflow:'hidden'}}>
                                                                            <a className="viewImg_btn" href="javascript:;" onClick={_this.viewImg}  >
                                                                            <img data-marknum={order.MarkNum} data-productimgurl={order.MarkOriginalImgUrl} src={order.ImgUrl} 
                                                                                data-x={markCoordinate && markCoordinate['x']} 
                                                                                data-y={markCoordinate && markCoordinate['y']} 
                                                                                data-w={markCoordinate && markCoordinate['w']}
                                                                                data-h={markCoordinate && markCoordinate['h']} /> 
                                                                            </a>
                                                                        </td>
                                                                        <td style={{paddingTop: 10, textAlign:'left'}}>
                                                                            <p>{order.ProductName}</p>
                                                                            <p>{order.Parameter}</p>
                                                                            <p className="desc_box">备注：{order.Message == null ? '' : order.Message}</p>
                                                                        </td>
                                                                        {
                                                                            !(item['ChannelId'] == Inlay2 || item['ChannelId'] == Stone || item['ChannelId'] == Ring) 
                                                                                ?   (order['Price'] 
                                                                                        ? <td valign="middle" style={{width:285, color:'#ff0000'}}>￥
                                                                                            <span className="price">{order['Price']}</span>
                                                                                            </td> 
                                                                                        : null)
                                                                                :   null
                                                                                
                                                                        }
                                                                        {
                                                                            !(item['ChannelId'] == Inlay2 || item['ChannelId'] == Stone || item['ChannelId'] == Ring)  
                                                                                ?   <td style={{width:285}}>
                                                                                        <div className="quantity_box">{order['Quantity']}</div>
                                                                                    </td>                                                                                    
                                                                                : null 
                                                                        }
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
                <footer className="clearfix" id="footer">
                    <div className="orderCode fl">订单号：1807231058538558</div>
                    <div className="orderCode fr">
                        {
                            state && (state.CheckCState == 1 && '1' == 1 && state.EnabledMark == 1 && state.DeleteMark == 0 ? <a href="javascript:;" data-name="CheckCState" data-status="2" className="btn" onClick={this.editOrderStatus}>审核订单</a> : null)
                        }
                        {
                            state && ((state.CheckCState != 2 &&state.CheckBState != 2 && state.CheckAState != 2) && (orderDetail.SellerId == 'd56bf32b-4a6b-4873-83c8-40aaf30cb195' || '1' == 1) && (state.EnabledMark == 1 && state.DeleteMark == 0) ? <a href="javascript:;" data-name="EnabledMark" data-status="0" className="btn" onClick={this.editOrderStatus}>取消订单</a> : null)
                        }
                        {
                            state && (state.CheckAState == 2 && state.CompleteState == 1 && '1' == 1 ? <a href="javascript:;" data-name="CompleteState" data-status="2" className="btn" onClick={this.editOrderStatus}>完成订单</a> : null)
                        }
                    </div>
                </footer>
                {this.state.imageProps.visible && <ProductImg {...this.state.imageProps}/>}
            </Modal>
            )
    }
}

export default connect(
    state => ({
        orderData: state.orderData,
    }),{
        getOrderDetailData,
        getListOrder
    }
)(Detail);;
