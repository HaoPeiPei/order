import React from 'react';
import { List, Pagination } from 'antd';
import axios from 'axios';
import { is, fromJS } from 'immutable';
import  { connect } from 'react-redux';
import $ from 'jquery';

import { getProductData, getGoldTypeData, getCategoryData, getProductDetailData } from '../../store/product/action.js';
import Filter from './filter/index.jsx';
//import List from './list/list.jsx';
import Detail from './detail/index.jsx';
import Gold from './detail/gold/index.jsx';

import './index.scss';

class Product extends React.Component{
    constructor(props){
        super(props);
        let channelName = this.props.match.params.channelName;
        let channelId = '';
        let modalName = '';
        if(channelName == 'Gold'){
            channelId = `53ebef4e-1038-407b-88e8-09d230e2dd52`;
            channelName = '素金现货';
            modalName = `Gold`;
        }else if(channelName == 'OutStock'){
            channelId = `8045c89a-c242-4fad-b077-5e65ce78e94b`;
            modalName = `OutStock`;
        }else if(channelName == 'Inlay1'){
            channelId = `f0ca235d-5539-4e31-b256-2a2e0cf4bf7f`;
            modalName = `Inlay1`;
        }else if(channelName == 'Inlay2'){
            channelId = `0e77c6ca-4a31-404f-b5ad-18882a2f15d0`;
            modalName = `Inlay2`;
        }
        this.state = {
            goldTypes: [],
            categorys: [],
            channelId: channelId,
            channelName: channelName,
            pageNumber: 1,
            pageSize: 20,
            detailProps: {
                modalName: modalName,
                productId: '',
                visible: false,
                onCancel: () => {
                    this.setState({
                        visible : false,
                })
                },
            }
        };
    }

    
    //获取通用商品数据请求参数
    getProductParam = () => {
        const factoryId = $.map($('input[name="factory"]:checked'), function (item, index) {
            return $(item).val();
        });

        const categoryId = $.map($('input[name="category"]:checked'), function (item, index) {
            return $(item).val();
        });

        const goldTypeItemId = $.map($('input[name="goldTypeItem"]:checked'), function (item, index) {
            return $(item).val();
        });

        const tag = $.map($('.other input:checked, .other select'), function (item, index) {
            if (!!$(item).val()) {
                var TagId = $(item).parents('.item').find('.title').attr('data-TagId');
                var TagItemId = $(item).val();
                return {
                    "TagId": TagId,
                    "TagItemId": TagItemId
                }
            }
        });

        var newMark = $('input[name="newMark"]:checked').length > 0 ? 1 : 0;

        var fineMark = $('input[name="fineMark"]:checked').length > 0 ? 1 : 0;

        var searchString = $('#searchStr').val();

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

    //分页跳转
    onPageNumberChange = (pageNumber) => {
        this.setState({
            pageNumber: pageNumber,
        });
        this.props.getProductData({
            "sort": "CreateDate",
            "order": "desc",
            "pageNumber": this.state.pageNumber,
            "pageSize": this.state.pageSize,
            "queryJson": JSON.stringify(this.getProductParam())
        });
    }

    //改变分页大小
    onPageSizeChange= (pageNumber,pageSize)=>{
        this.setState({
            pageNumber: pageNumber,
            pageSize: pageSize,
        });
        this.props.getProductData({
            "sort": "CreateDate",
            "order": "desc",
            "pageNumber": this.state.pageNumber,
            "pageSize": this.state.pageSize,
            "queryJson": JSON.stringify(this.getProductParam())
        });
    }

    showProductDetail=(e)=>{
        const productId = e.target.parentNode.getAttribute('data-productId');
        this.setState({
            detailProps: Object.assign(
                {},
                this.state.detailProps, 
                { 
                    visible: true, 
                    productId: productId, 
                }
            )
        });
    }
    
    componentDidMount(){
        document.title = this.state.channelName;
        document.querySelector('#channelTitle').innerHTML = this.state.channelName;

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
        /* if(!this.props.productData.goldTypeList.length){
            this.props.getGoldTypeData();
        } */

        //加载商品品类
        /* if(!this.props.productData.categoryList.length){
            this.props.getCategoryData();
        }     */    

    }


    render(){

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

        const modal = ()=>{
            if(this.state.detailProps.modalName == 'Gold'){
                return (
                    <Gold {...this.state.detailProps} />    
                )
            }
        }

        return (
            <div id="productList">
                <header>
                    <div className="navbar">
                        <img className="headerLogo_bg" src={require('./images/headerLogo_bg.png')} alt="" />
                        <span className="title" id="channelTitle">素金现货</span>
                        <a className="logo" href="/">
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
                        <div className="product_list">
                            <List
                                itemLayout="vertical"
                                size="large"
                                pagination={false}
                                dataSource={this.props.productData.productList}
                                renderItem={item => (
                                <List.Item
                                    key={item.ProductId}
                                >
                                    <List.Item.Meta
                                    title={
                                        <a className="showProductDetailBtn" href='javascript:;' data-productId={item.ProductId} onClick={this.showProductDetail}>
                                            <img src={item.ImgUrl} alt=""/>
                                        </a>
                                    }
                                    description={item.Title}
                                    />
                                    {item.content}
                                </List.Item>
                                )}
                            />
                            <Pagination 
                                total={this.props.productData.total} 
                                pageSize={this.state.pageSize} 
                                current={this.state.pageNumber}
                                showSizeChanger 
                                showQuickJumper 
                                pageSizeOptions={['20','30','50','100']}
                                onChange={this.onPageNumberChange}
                                onShowSizeChange={this.onPageSizeChange}
                            />
                        </div>
                    </div>
                </section>
                { this.state.detailProps.visible && modal()  }
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