import React from 'react';
import  { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';
import jQuery from 'jquery';

import { getProductData, getProductSearch } from '../../store/product/action.js';
import Filter from './filter/index.jsx';
import _List from './list/index.jsx';
import Detail from './detail/index.jsx';

import './index.scss';

class Product extends React.Component{
    constructor(props){
        super(props);
        const channelName_EN = this.props.match.params.channelName;
        const {channelId, channelName_ZH} = this.getChannel(channelName_EN);
        const productParam = this.getProductParam();
        this.state = {
            goldTypes: [],
            categorys: [],
            channelId: channelId,
            channelName: channelName_ZH,
            productParam: {
                queryJson: JSON.stringify(
                    Object.assign({}, productParam, {
                        channelId: channelId
                    })
                ),
                sort: 'CreateDate',
                order: 'desc',
            },
            filterProps: {
                productSearchList: props.productData.productSearchList ||[],
                onFilterChange: (queryJson) => {
                    queryJson = Object.assign({}, JSON.parse(this.state.productParam.queryJson), queryJson)
                    this.setState({
                        productParam: Object.assign({}, this.state.productParam,{
                            ...this.state.listProps.pagination,
                            queryJson: JSON.stringify(queryJson)
                        })
                    },()=>{
                        this.props.getProductData(this.state.productParam);
                        this.props.getProductSearch(this.state.productParam);
                    })
                }
            },
            listProps: {
                productList: props.productData.productList ||[],
                pagination: {
                    pageNumber: 1,
                    pageSize: 20,
                    total: props.productData.total || 0,
                },
                onPageChange: (page) => {
                    this.setState({
                        productParam: Object.assign({}, this.state.productParam, page),
                        listProps: {
                            pagination: Object.assign({}, this.state.listProps.pagination, page)
                        } 
                    },()=>{
                        this.props.getProductData(this.state.productParam);
                    })
                },
                showProductDetail: (productId)=>{
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
            },
            detailProps: {
                modalName: channelName_EN,
                productId: '',
                visible: false,
                footer: null,
                onCancel: () => {
                    this.setState({
                        detailProps: Object.assign({}, this.state.detailProps, { visible: false })
                    })
                },
            }
        };
    }

    //根据channelName_EN,获取频道信息
    getChannel = (channelName_EN) =>{
        let channelId = '';
        let channelName_ZH = '';
        if(channelName_EN == 'Gold'){
            channelId = `53ebef4e-1038-407b-88e8-09d230e2dd52`;
            channelName_ZH = `素金现货`;
        }else if(channelName_EN == 'OutStock'){
            channelId = `8045c89a-c242-4fad-b077-5e65ce78e94b`;
            channelName_ZH = `看图上货`;
        }else if(channelName_EN == 'Inlay1'){
            channelId = `f0ca235d-5539-4e31-b256-2a2e0cf4bf7f`;
            channelName_ZH = `镶嵌现货Ⅰ`;
        }else if(channelName_EN == 'Inlay2'){
            channelId = `0e77c6ca-4a31-404f-b5ad-18882a2f15d0`;
            channelName_ZH = `镶嵌现货Ⅱ`;
        }
        return {
            channelName_ZH: channelName_ZH,
            channelId: channelId, 
        }
    }

    //获取通用商品数据请求参数
    getProductParam = () => {
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
                const TagId = jQuery(item).parents('.item').find('.title').attr('data-TagId');
                const TagItemId = jQuery(item).val();
                return {
                    "TagId": TagId,
                    "TagItemId": TagItemId
                }
            }
        });

        const newMark = jQuery('input[name="newMark"]:checked').length > 0 ? 1 : 0;

        const fineMark = jQuery('input[name="fineMark"]:checked').length > 0 ? 1 : 0;

        const searchString = jQuery('#searchStr').val();
        
        return {
            FactoryId: factoryId,
            CategoryId: categoryId,
            GoldTypeItemId: goldTypeItemId,
            Tag: tag,
            NewMark: newMark,
            FineMark: fineMark,
            SearchString: searchString,
        }
    }

    onFilterChange = (filter) => {
        this.setState({
            productParam: {
                queryJson: JSON.stringify(
                    Object.assign({}, JSON.parse(this.state.productParam.queryJson), filter)
                )
            }
        })
    }

    componentDidMount(){
        document.title = this.state.channelName; 
        document.querySelector('#channelTitle').innerHTML = this.state.channelName;
        let productParam = Object.assign({}, this.state.productParam, {
            pageNumber: 1,
            pageSize: 20,
        })
        this.props.getProductData(productParam);
        this.props.getProductSearch(productParam);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            productList: nextProps.productData.productList,
            total: nextProps.productData.total,
            productSearchList: nextProps.productData.productSearchList
        })
    }

    render(){
    
        return (
            <div id="productList">
                <header>
                    <div className="navbar">
                        <img className="headerLogo_bg" src={require('./images/headerLogo_bg.png')} alt="" />
                        <span className="title" id="channelTitle">素金现货</span>
                        <Link to="/" className="logo">
                            <img src={require('./images/proList_logo.png')} alt="" />
                        </Link>
                        <ul className="navbar_right">
                            <li>
                                <div className="searchStr_box" id="searchStr_box">
                                    <input type="text" className="search_text" id="searchStr" placeholder="请输入你要搜索的内容" />
                                    <img src="/Content//images/proSearch_icon.png" alt="" className="search_btn" />
                                </div>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <img src={require('../../assets/images/managercart_icon.png')} alt="" />
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <img src={require('../../assets/images/member_iocn.png')} alt="" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </header>
                <section>
                    <div className="main_right">                                                                        
                        <Filter {...this.state.filterProps}/>
                        <_List {...this.state.listProps} />
                    </div>
                </section>
                { 
                   this.state.detailProps.visible && <Detail {...this.state.detailProps}/>
                }
            </div>
        )
    }
}
export default connect(
    state => ({
        productData: state.productData,
    }),{
        getProductData,
        getProductSearch
    }
)(Product);