import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getListOrder } from '../../../store/order/active.js';
import { getAddressList } from '../../../store/member/active.js';
import './index.scss';

const Gold = '53ebef4e-1038-407b-88e8-09d230e2dd52';
const Stone = '9ee97263-e7a0-4190-ac7c-c42df4ab4c54';
const Inlay1 = 'f0ca235d-5539-4e31-b256-2a2e0cf4bf7f';
const Inlay2 = '0e77c6ca-4a31-404f-b5ad-18882a2f15d0';
const OutStock = '8045c89a-c242-4fad-b077-5e65ce78e94b';
const Ring = '752011f1-b6ff-43c6-9a80-380b95d95546';

class AddOrder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            address: {
                addressId: ''
            }
        }
    }

    componentDidMount(){
        let orderData = {
            CartIds: this.props.match.params.cartIds.split(',')
        }
        let addressData = {
            AddressId: this.state.address['addressId']
        }
        this.props.getListOrder(orderData);
        this.props.getAddressList(addressData);
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

    //获取默认地址的坐标
    getAddreessIndex = (addressList) => {
        let defaultAddressFlat = true;
        let defaultAddressIndex;
        for(let i = 0; i < addressList.length; i++){
            let address = addressList[i];
            if(address['AddressId'] == this.state.addressId){
                defaultAddressFlat = false;
                defaultAddressIndex = i;
            }else{
                if(address["DefaultMark"] == 1){
                    defaultAddressFlat = false;
                    defaultAddressIndex = i;
                }
            }
        }
        return defaultAddressIndex
    }

    render(){
        let _this = this;
        const orderList = this.props.orderData.orderList;
        const addressList = this.props.memberData.addressList;
        let addressIndex = this.getAddreessIndex(addressList);
        let address = !addressIndex ? {} : Object.assign({}, this.state.address,addressList[addressIndex]);       
        return (
            <div className='addOrder'>
                <header>
                    <div className="navbar">
                        <img className="headerLogo_bg" src='http://xd.zbs6.com/Content/images/headerLogo_bg.png' alt="" />
                        <span className="title" id="channelTitle">填写订单信息</span>
                        <Link to="/" className="logo">
                            <img src={require('../../../assets/images/proList_logo.png')} alt="" />
                        </Link>
                        <ul className="navbar_right">
                            <li>
                                <a href="javascript:;">清空搜索条件</a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <img src={require('../../../assets/images/proSearch_icon.jpg')} alt="" />
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <img src={require('../../../assets/images/proCart_icon.jpg')} alt="" />
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <img src={require('../../../assets/images/proCollect_icon.jpg')} alt="" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </header> 
                <section>
                    <div id="address" className="address">
                        <img className="address_img" src={require('../../../assets/images/address_icon.jpg')} alt="" />
                           {
                                !addressIndex 
                                    ?   <div className="accept_info">
                                            <p>客户自提</p>
                                            <p>客户不需要邮寄，自到供货商展厅取货</p>
                                        </div> 
                                    :   <div className="accept_info">
                                            <p>{address["Contacts"]}&nbsp;&nbsp;&nbsp;&nbsp;{address["Mobile"]}</p>
                                            <p>{address["ProvinceName"]},{address["CityName"]},{address["CountyName"]},{address["StreetName"]},{address["Address"]}</p>
                                        </div> 
                           }
                        <a href="javascript:;" className="chageAddress chageAddress_btn pr" ><span>更改收货地址</span><i className="iconfont icon-arrow-right"></i></a>
                    </div>
                    <div className="orderTitle row">
                        <ul>
                            <li>
                                <label className="title">挂签：</label>
                                <input type="text" id="goldTag" placeholder="填写挂签" />
                            </li>
                            <li>
                                <label className="title">字印：</label>
                                <input type="text" id="lettering" placeholder="请输入要刻入的字印" />
                            </li>
                            <li>
                                <label className="title">号码：<span style={{color:'#ff0000'}}>*</span></label>
                                <input type="text" className="form-control" id="sellerTelphone" isvalid="yes" title="号码" checkexpession="MobileOrPhoneAndNull" placeholder="请填写号码方便配货中及时沟通" />
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <label className="title">证书：</label>
                                <input type="text" id="certificate" placeholder="填写证书" />
                            </li>
                            <li>
                                <label className="title">备注：</label>
                                <input type="text" id="description" value='' placeholder="填写备注" />
                            </li>
                        </ul>
                    </div>
                    <ul id="orderList">
                        {
                            orderList.map(function(item, index){
                                let cartData = item['CartData'];
                                var channelName =  _this.switchChnanel(item['ChannelId'])["channelName"]; 
                                return  <li key={`${item['ChannelId']}`.concat(`${item['GoldTypeItemId']}`)} className="order_item">
                                            <h3 className="title clearfix">
                                                <span className="fl info_left">
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
                                                                                <p className="desc_box">备注：{cart.Message == null ? '' : cart.Message} </p>
                                                                            </td>
                                                                            {
                                                                                !(item['ChannelId'] == Inlay2 || item['ChannelId'] == Stone || item['ChannelId'] == Ring) 
                                                                                    ?   (cart['Price'] 
                                                                                            ? <td valign="middle" style={{width:285, color:'#ff0000'}}>￥<span className="price">{cart['Price']}</span></td> 
                                                                                            : null)
                                                                                    :   null
                                                                                    
                                                                            }
                                                                            {
                                                                                !(item['ChannelId'] == Inlay2 || item['ChannelId'] == Stone || item['ChannelId'] == Ring)  
                                                                                    ?   <td style={{width:285}}>x{cart['Quantity']}</td>                                                                                    
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
                <footer className="clearfix">
                    <div className="fr">
                        <a href="javascript:;" className="addOrder_btn">提交订单</a>
                    </div>
                </footer>
            </div>
        )
    }
}

export default connect(
    state => ({
        orderData: state.orderData,
        memberData: state.memberData
    }),{
        getListOrder,
        getAddressList
    }
)(AddOrder);