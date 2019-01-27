import React from 'react';
import  { connect } from 'react-redux';
import { getProductDetailData } from '../../../store/product/action.js';

import Gold from './gold/index.jsx';
import OutStock from './outStock/index.jsx';
import Inlay1 from './inlay1/index.jsx';
import Inlay2 from './inlay2/index.jsx';

import './index.scss';

class Detail extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        //加载商品详情
        this.props.getProductDetailData(this.props.productId);
    }

    render(){
        const modalName = this.props.modalName;
        if(modalName == 'Gold'){
            return (
                <Gold  {...this.props}/>   
            )
        }else if(modalName == 'OutStock'){
            return (
                <OutStock  {...this.props}/>    
            )
        }else if(modalName == 'Inlay1'){
            return (
                <Inlay1  {...this.props}/>    
            )
        }else if(modalName == 'Inlay2'){
            return (
                <Inlay2  {...this.props}/>    
            )
        }
    }
}

export default connect(
    state => ({
        productDetail: state.productData.productDetail,
    }),
    {
        getProductDetailData
    }
)(Detail);
