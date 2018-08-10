import React from 'react';
import  { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { is, fromJS } from 'immutable';
import $ from 'jquery';

import { getProductData, getGoldTypeData, getCategoryData, getProductDetailData } from '../../store/product/action.js';
import Filter from './filter/index.jsx';
import _List from './list/index.jsx';
import Detail from './detail/index.jsx';

import './index.scss';

class Product extends React.Component{
    constructor(props){
        super(props);
        const channelName_EN = this.props.match.params.channelName;
        const {channelId, channelName_ZH} = this.getChannel(channelName_EN);
        const filter = this.getProductParam();
        this.state = {
            goldTypes: [],
            categorys: [],
            channelId: channelId,
            channelName: channelName_ZH,
            filter: {
                queryJson: JSON.stringify(
                    Object.assign({},filter,{
                        channelId: channelId
                    })
                ),
                sort: 'CreateDate',
                order: 'desc',
            },
            listProps: {
                filter: {
                    queryJson: JSON.stringify(
                        Object.assign({},filter,{
                            channelId: channelId
                        })
                    ),
                    sort: 'CreateDate',
                    order: 'desc',
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
                const TagId = $(item).parents('.item').find('.title').attr('data-TagId');
                const TagItemId = $(item).val();
                return {
                    "TagId": TagId,
                    "TagItemId": TagItemId
                }
            }
        });

        const newMark = $('input[name="newMark"]:checked').length > 0 ? 1 : 0;

        const fineMark = $('input[name="fineMark"]:checked').length > 0 ? 1 : 0;

        const searchString = $('#searchStr').val();
        
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

    componentDidMount(){
        document.title = this.state.channelName;
        document.querySelector('#channelTitle').innerHTML = this.state.channelName;
        

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
                        {/* <Filter {...filterProps} /> */}
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
        getGoldTypeData,
        getCategoryData,
        getProductDetailData
    }
)(Product);