import React from 'react';
import { Form, Input, InputNumber, Radio, Modal, Cascader, Checkbox } from 'antd';
import  { connect } from 'react-redux';
import ImageGallery from 'react-image-gallery';
import { getProductDetailData } from '../../../../store/product/action.js';
import "react-image-gallery/styles/scss/image-gallery.scss";

class Inlay1 extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            productDetail: props.productDetail
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
        images = images.map((img,index) =>{
            return {
                original: img.OriginalPath,
                thumbnail: img.ThumbPath,
            }
        })
      
        
        return (
            <Modal {...this.props} 
                className="deatal_common"
            >
                <div className="datail_left" >
                    <ImageGallery items={ images }/>
                </div>
                <div className="datail_right">
                    <div className="info_top">
                        <h2 className="title">{ productDetail.title }</h2>
                        <p><span className="goodsNo">款号：{ productDetail['GoodsNo'] } </span><span>类别：{ productDetail['CategoryName'] }</span></p>
                        <p>库存：<span>{ productDetail['stockQuantity'] }件</span></p>
                    </div>
                    <div className="info_mid">
                        <div className="amountWeight">
                            <span className="title">参考克重</span>{ productDetail.amountWeight }
                        </div>
                        <div className="texture">
                            <span className="title">产品材质</span>{ productDetail.texture }
                        </div>
                        <div className="weight">
                            <span className="title">下单重量</span>
                            <div className="weight_box">
                                <input type="text" id="goldWeight" name="goldWeight" className="goldWeight" value={ productDetail['goldWeight'] || ''} onChange={ this.inputChange }/>
                                <span>g - </span>
                                <input type="text" id="goldWeightB" name="goldWeightB" className="goldWeightB" value={ productDetail['goldWeightB'] || ''} onChange={ this.inputChange }/>
                                <span>g</span>
                            </div>
                        </div>
                        <div className="quantity_wrap">
                            <span className="title">数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量</span>
                            <div className="quantity_box">
                                <i className="iconfont icon-jian"></i>
                                <input type="text" className="quantity" name="quantity" value='1' onChange={ this.inputChange }/>
                                <i className="iconfont icon-jia"></i>
                            </div>
                        </div>
                        <div className="measure_wrap">
                            <span className="title">尺&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;寸</span>
                            <input type="text" id="measure"  className="measure" placeholder="指圈号或链长" />
                        </div>
                    </div>
                    <div className="info_fot">
                        <div className="desc_wrap">
                            <span className="title">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</span>
                            <textarea name="desc" id="desc" className="desc"></textarea>
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
)(Inlay1);
