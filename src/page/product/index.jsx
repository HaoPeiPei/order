import React from 'react';
import axios from 'axios';

import './index.scss'

 
class Product extends React.Component{
    constructor(props){
        super(props);
        this.state={
            channelName : this.props.match.params.channelName,
            productList : [],

        }
    }

    componentDidMount(){
        let url = '';
        if(this.state.channelName == 'goldStock'){
            url = `/Products/GetGoldStockList`
            document.title = '素金现货';
            document.querySelector('#channelTitle').innerHTML = '素金现货'
        }else if(this.state.channelName == 'outStockCenter'){
            url = `/Products/GetOutStockCenterList`
            document.title = '看图订货';
        }else if(this.state.channelName == 'KTStock'){
            url = `/Products/GetKTStock`
            document.title = '空托现货';
        }/* else if(this.state.channelName == 'GoldStockLists'){
            this.setState({
                'loadproductListUrl' : '/Products/GetGoldStockList'
            })
            document.title = '首页';
        } */else if(this.state.channelName == 'inlayStock2'){
            url = `/Products/GetInlay2StockList`
            document.title = '镶嵌现货';
        }

        this.loadproductList(url);
    }

    loadproductList(url){
        const queryJson = { "categoryData": [], "goldTypeItemDate": [], "stringParam": "", };
        axios.post(url, {
            "pageNumber":1,
            "pageSize":20,
            "queryJson": JSON.stringify(queryJson),
        })
        .then(res=>{
            if (res.data.success) {
                let productList = res.data.data.rows;
                console.log(productList)
                this.setState({
                    productList : productList
                }) 
            }
        })
        .catch(err=>{

        });
}

    render(){
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
                    <ul className="search_left">
                        <li>
                            <a href="javascript:;">
                                <img src={require('./images/18K-黄金黄@2x.png')} alt="" />
                            </a>
                        </li>
                        
                    </ul>
                    <div className="main_right">
                        <ul className="search_box">
                            <li>
                                <span className="title">工厂：</span>
                                <div>
                                    <a  href="javascript:;">JL</a>
                                    <a className="active" href="javascript:;">FDF</a>
                                    <a href="javascript:;">PJ</a>
                                    <a href="javascript:;">DBS</a>
                                    <a href="javascript:;">JJP</a>
                                    <a href="javascript:;">ADK</a>
                                    <a href="javascript:;">BF</a>
                                    <a href="javascript:;">YH</a>      
                                    <a href="javascript:;">LJ</a>      
                                    <a href="javascript:;">DC</a>      
                                    <a href="javascript:;">RQ</a>      
                                    <a href="javascript:;">SF</a>      
                                </div>
                            </li>
                            <li>
                                <span className="title">品类：</span>
                                <div>
                                    <a className="active" href="javascript:;">戒指</a>
                                    <a  href="javascript:;">项链</a>
                                    <a href="javascript:;">手链</a>
                                    <a href="javascript:;">吊坠</a>
                                    <a href="javascript:;">耳饰</a>
                                    <a href="javascript:;">手链</a>
                                    <a href="javascript:;">脚链</a>
                                </div>
                            </li>
                            <li>
                                <span className="title">标签：</span>
                                <div>
                                    <a className="active" href="javascript:;">JL</a>
                                    <a  href="javascript:;">FDF</a>
                                    <a href="javascript:;">PJ</a>
                                    <a href="javascript:;">DBS</a>
                                    <a href="javascript:;">JJP</a>
                                    <a href="javascript:;">ADK</a>
                                    <a href="javascript:;">BF</a>
                                    <a href="javascript:;">YH</a>      
                                    <a href="javascript:;">LJ</a>      
                                    <a href="javascript:;">DC</a>      
                                    <a href="javascript:;">RQ</a>      
                                    <a href="javascript:;">SF</a>      
                                </div>
                            </li>
                            <li>
                                <span className="title">工艺：</span>
                                <div>
                                    <a className="active" href="javascript:;">JL</a>
                                    <a  href="javascript:;">FDF</a>
                                    <a href="javascript:;">PJ</a>
                                    <a href="javascript:;">DBS</a>
                                    <a href="javascript:;">JJP</a>
                                    <a href="javascript:;">ADK</a>
                                    <a href="javascript:;">BF</a>
                                    <a href="javascript:;">YH</a>      
                                    <a href="javascript:;">LJ</a>      
                                    <a href="javascript:;">DC</a>      
                                    <a href="javascript:;">RQ</a>      
                                    <a href="javascript:;">SF</a>      
                                </div>
                            </li>
                            <li>
                                <span className="title">更多：</span>
                                <ul></ul>
                            </li>
                        </ul>
                        <ul className="product_list" id="proList">
                            {
                                this.state.productList.length > 0 && this.state.productList.map((product, index) => {
                                    let imgUrl =  product.imgUrl.split('?x-oss-process')[0];
                                    return (
                                        <li className="proItem" key={index}>
                                            <a className="img" href="javascript:;">
                                                <img src={imgUrl} alt="" />
                                            </a>
                                            <p className="info">
                                            <span className="product_name">数字女戒</span>
                                            <a className="collect_btn" href="javascript:;">
                                                <img src={require('./images/proCollect_icon.jpg')} alt=""/>
                                            </a> 
                                            </p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        
                    </div>
                </section>
            </div>
        )
    }
}

export default Product;