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
        let productImg = images.length >0 ? <GoldCanvas addImgItem={this.addImgItem} imgList={this.state.imgList} backgroundImg={images[0]["OriginalPath"]} />: ``;
        return (
            <Modal {...this.props} 
                className="detail goldDetail"
            >
                {productImg}
                <div className="detail_right">
                    <div className="product_title">
                        <h2 className="goodTitle">{productDetail['Title']}</h2>
                        <div>
                            <span className="goodsNo">款号：{productDetail['GoodsNo']} </span>
                            <span>类别：{productDetail['CategoryName']}</span>
                        </div>
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
