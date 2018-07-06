import React from 'react';
import axios from 'axios';
import { is, fromJS } from 'immutable';
import  { connect } from 'react-redux';
import { getProductData, getGoldTypeData, getCategoryData, getProductDetailData } from '../../store/product/action.js';
import Filter from './filter/index.jsx';
import List from './list/list.jsx';
import Detail from './detail/index.jsx';

import './index.scss';

let url = null;
let queryJson = { "categoryData": [], "goldTypeItemDate": [], "stringParam": "", };
  
  class Product extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible : false,
            goldTypes: [],
            categorys: [],
            productDetailVisible: false,
            productDetailId: ''
        };
    }

    componentDidMount(){
        const channelName = this.props.match.params.channelName;
        if(channelName == 'goldStock'){
            url = `/Products/GetGoldStockList`
            document.title = '素金现货';
            document.querySelector('#channelTitle').innerHTML = '素金现货'
        }else if(channelName == 'outStockCenter'){
            url = `/Products/GetOutStockCenterList`
            document.title = '看图订货';
        }else if(channelName == 'KTStock'){
            url = `/Products/GetKTStock`
            document.title = '空托现货';
        }/* else if(channelName == 'GoldStockLists'){
            this.setState({
                'loadproductListUrl' : '/Products/GetGoldStockList'
            })
            document.title = '首裸钻中心';
        } */else if(channelName == 'inlayStock2'){
            url = `/Products/GetInlay2StockList`
            document.title = '镶嵌现货';
        }
        //加载商品列表
        if(!this.props.productData.productList.length){
            this.props.getProductData(url, queryJson);
        }

        //加载商品成色
        if(!this.props.productData.goldTypeList.length){
            this.props.getGoldTypeData();
        }

        //加载商品品类
        if(!this.props.productData.categoryList.length){
            this.props.getCategoryData();
        }        

    }

    render(){
       
        const listProps = {
            productList: this.props.productData.productList,
            handleClick : (productId) =>{
                if(!!productId){
                    this.setState({
                        productDetailVisible: true,
                        productDetailId: productId
                    })
                }                                                    
            }
        }
        
        const detailProps = {
            productDetailId: this.state.productDetailId,
            visible: this.state.productDetailVisible,
            maskClosable: false,
            footer:null,
            wrapClassName: 'vertical-center-modal',
            onCancel: () => {
                this.setState({
                    productDetailVisible : false,
                })
            },
        }


        const filterProps = {
            filter: {
                goldTypes: {
                    title: '商品成色',
                    dates: this.props.productData.goldTypeList, 
                    value: 'goldTypeId' ,
                    text: 'goldTypeItemName',  
                    name: 'goldTypeItemDate'                  
                },
                categorys: {
                    title: '商品品类',
                    dates: this.props.productData.categoryList, 
                    value: 'categoryId' ,
                    text: 'categoryName',
                    name: 'categoryData'  
                },
            },
            onFilterChange:  (value)=> {
                this.props.getProductData(url, value);
            },
        }
        return (
            <div id="productList">
                <header>
                    <div className="navbar">
                        <img className="headerLogo_bg" src={require('./images/headerLogo_bg.png')} alt="" />
                        <span className="title" id="channelTitle">素金现货</span>
                        <a className="logo" href="./index.html">
                            <img src={require('./images/proList_logo.png')} alt="" />
                        </a>
                        <ul className="navbar_right">
                            <li>
                                <a href="javascript:;">清空搜索条件</a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <img src={require('./images/proSearch_icon.jpg')} alt="" />
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <img src={require('./images/proCart_icon.jpg')} alt="" />
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <img src={require('./images/proCollect_icon.jpg')} alt="" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </header>
                <section>
                    <div className="main_right">                                                                        
                        <Filter {...filterProps} />
                        <List {...listProps} />
                    </div>
                </section>
                { this.state.productDetailVisible && <Detail {...detailProps} /> }
            </div>
        )
    }
}

export default connect(
    state => ({
        productData: state.productData,
    }),{
        getProductData,
        getGoldTypeData,
        getCategoryData,
        getProductDetailData
    }
)(Product);