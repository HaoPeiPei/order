import React from 'react';
import { Form, Input, InputNumber, Radio, Modal, Cascader, Checkbox } from 'antd';
import  { connect } from 'react-redux';
import axios from 'axios';
import { getProductDetailData } from '../../../../store/product/action.js';

import GoldCanvas from '../../../../component/canvas/index.jsx';

class Gold extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            productDetail: this.props.productDetail || {},
            imgList: []

        }
    }

    renderImgItem = (imgData) =>{
        this.setState({
            imgList: [...this.state.imgList, imgData]
        })
        /* $('.cartTip').hide();
            $('.reset_btn').show();
            $('#imgInfo_list li').removeClass('active');
            var $li = $('<li class="imgInfo_item active clearfix" data-id="' + imgData['sid'] + '">' +
                     '<div class="img_wrap"><img class="img" src="' + imgData['imgSrc'] + '" /></div>' +
                     '<div class="input_wrap">' +
                     '<div class="weight_range">' +
                     '<div class="start_wrap">' +
                     '<input data-title="克重" class="weightA" type="number" isvalid="yes" checkexpession="Num" value="' + imgData['weightA'] + '"/>' +
                     '<span class="unit">g</span>' +
                     '</div>' +
                     '<span class="line">-</span>' +
                     '<div class="end_wrap">' +
                     '<input data-title="克重" type="number" isvalid="yes" checkexpession="Num" class="weightB" value="' + imgData['weightB'] + '" />' +
                     '<span class="unit">g</span>' +
                     '</div>' +
                     '</div>' +
                     '<div class="num_wrap">' +
                     '<i class="iconfont icon-jian"></i>' +
                     '<input data-title="数量" type="number" isvalid="yes" checkexpession="Num" value="1"  class="quantity"/>' +
                     '<i class="iconfont icon-jia"></i>' +
                     '</div>' +
                     '</div>' +
                     '<a href="javascript:;" class="btn btn-xs btn-danger remove_btn">×</a>' +
                     '</li>');

            $('#imgInfo_list').append($li); */
    }

    componentWillMount(){
       this.setState({
            productDetail: {}
       })
    }

    componentDidMount(){
        //加载商品详情
        this.props.getProductDetailData(this.props.productId);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            productDetail: nextProps.productDetail
        })
    }

    drawImgItem = () => {
        
    }

    inputChange =(e) =>{
        let inputName  = e.target.name;
        let inputValue = parseInt(e.target.value);
        this.setState({
            productDetail: Object.assign({}, this.state.productDetail, { [inputName]: inputValue })
        })
    }

    onSubmit = () => {  
        this.props.onCancel()       
    }


    render(){
        const productDetail = this.state.productDetail;
        let images = productDetail.ImageAlbums || [];
        let productImg = images.length >0 ? <GoldCanvas renderImgItem={this.renderImgItem} backgroundImg={images[0]["OriginalPath"]} />: ``;
        let imgList = this.state.imgList.length >0 
            ? <ul id="imgInfo_list" className="imgInfo_list">
                {this.state.imgList.map(function(item, index){
                    return `<li key=${item['sid']} class="imgInfo_item active clearfix" data-id=${item['sid']}>
                                <div class="img_wrap"><img class="img" src=${item['imgSrc']} /></div>
                            </li>`
                })}
                <a href="javascript:;" className="reset_btn">清空</a>
            </ul>
            :  <img className="cartTip" src={require(`../../../../assets/images/cartTip_icon.png`)} alt="" />
        return (
            <Modal {...this.props} 
                className="detail goldDetail"
            >
                <div className="detail_left" >
                    {productImg}
                </div>
                <div className="detail_right">
                    <div className="product_title">
                        <h2 className="goodTitle">{productDetail['Title']}</h2>
                        <div>
                            <span className="goodsNo">款号：{productDetail['GoodsNo']} </span>
                            <span>类别：{productDetail['CategoryName']}</span>
                        </div>
                    </div>
                    <div className="imgInfo_list_wrap">
                        {/* <ul id="imgInfo_list" className="imgInfo_list">
                            <a href="javascript:;" className="reset_btn">清空</a>
                        </ul> */}
                        {imgList}
                    </div>
                    
                    <a className="addCart_btn" onClick={ this.onSubmit }>
                        <img src="../Content/images/addCart_icon.png" alt="" />
                        <span>下单</span>
                    </a>
                </div>
            </Modal>
            )
    }
}

export default connect(
    state => ({
        productDetail: state.productData.productDetail,
    }),
    {
        getProductDetailData
    }
)(Gold);
