import React from 'react';
import axios from 'axios';
import { is, fromJS } from 'immutable';
import  { connect } from 'react-redux';
import { jQuery } from 'jquery'

import { getProductData, getGoldTypeData, getCategoryData, getProductDetailData } from '../../store/product/action.js';
import Filter from './filter/index.jsx';
import List from './list/list.jsx';
import Detail from './detail/index.jsx';

import './index.scss';

class Product extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible : false,
            goldTypes: [],
            categorys: [],
            productDetailVisible: false,
            productDetailId: '',
            channelId: '',
            pageNumber: 1,
            pageSize: 20

        };
    }

    
    //获取通用商品数据请求参数
    getProductParam = () => {
        debugger
        const factoryId = jQuery.map(jQuery('input[name="factory"]:checked'), function (item, index) {
            return jQuery(item).val();
        });

        const categoryId = jQuery.map(jQuery('input[name="category"]:checked'), function (item, index) {
            return jQuery(item).val();
        });

        const goldTypeItemId = jQuery.map(jQuery('input[name="goldTypeItem"]:checked'), function (item, index) {
            return jQuery(item).val();
        });

        const tag = jQuery.map(jQuery('.other input:checked, .other select'), function (item, index) {
            if (!!jQuery(item).val()) {
                var TagId = jQuery(item).parents('.item').find('.title').attr('data-TagId');
                var TagItemId = jQuery(item).val();
                return {
                    "TagId": TagId,
                    "TagItemId": TagItemId
                }
            }
        });

        var newMark = jQuery('input[name="newMark"]:checked').length > 0 ? 1 : 0;

        var fineMark = jQuery('input[name="fineMark"]:checked').length > 0 ? 1 : 0;

        var searchString = jQuery('#searchStr').val();

        var postParam = {
            "ChannelId": this.state.channelId,
            "FactoryId": factoryId,
            "CategoryId": categoryId,
            "GoldTypeItemId": goldTypeItemId,
            "Tag": tag,
            "NewMark": newMark,
            "FineMark": fineMark,
            "SearchString": searchString,
        }
        return postParam;
    }

    
    componentDidMount(){
        const channelName = this.props.match.params.channelName;
        if(channelName == 'Gold'){
            this.setState({
                channelId: `53ebef4e-1038-407b-88e8-09d230e2dd52`
            })
            document.title = '素金现货';
            document.querySelector('#channelTitle').innerHTML = '素金现货'
        }else if(channelName == 'OutStock'){
            this.setState({
                channelId: `8045c89a-c242-4fad-b077-5e65ce78e94b`
            })
            document.title = '看图订货';
            document.querySelector('#channelTitle').innerHTML = '看图订货'
        }else if(channelName == 'Inlay1'){
            this.setState({
                channelId: `f0ca235d-5539-4e31-b256-2a2e0cf4bf7f`
            })
            document.title = '镶嵌现货Ⅰ';
            document.querySelector('#channelTitle').innerHTML = '镶嵌现货Ⅰ'
        }else if(channelName == 'Inlay2'){
            this.setState({
                channelId: `0e77c6ca-4a31-404f-b5ad-18882a2f15d0`
            })
            document.title = '镶嵌现货Ⅱ';
            document.querySelector('#channelTitle').innerHTML = '镶嵌现货Ⅱ'
        }
        //加载商品列表
        if(!this.props.productData.productList.length){
            this.props.getProductData({
                "sort": "CreateDate",
                "order": "desc",
                "pageNumber": this.state.pageNumber,
                "pageSize": this.state.pageSize,
                "queryJson": JSON.stringify(this.getProductParam())
            });
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
                this.props.getProductData(value);
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