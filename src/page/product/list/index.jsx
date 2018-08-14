import React from 'react';
import  { connect } from 'react-redux';
import { List, Pagination } from 'antd';

import { getProductData } from '../../../store/product/action.js';


class _List extends React.Component{
    constructor(props){
        super(props)
        this.state={
            pageNumber: 1,
            pageSize: 20,
            productList: this.props.productData.productList || [],
            total: this.props.productData.total || 0,
            filter:this.props.filter
        }
    }

    componentWillMount(){
        this.setState({
            productList: [],
            total: 0,
        })
     }

    componentDidMount(){
        let filter = Object.assign({}, this.state.filter, {
            pageNumber: 1,
            pageSize: 20,
        })
        this.props.getProductData(filter);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            productList: nextProps.productData.productList,
            total: nextProps.productData.total,
        })
    }

    showProductDetail=(e)=>{
        const productId = e.target.parentNode.getAttribute('data-productid');
        this.props.showProductDetail(productId);
    }
    

    //分页跳转
    onPageNumberChange = (pageNumber) => {
        this.setState({
            pageNumber: pageNumber,
        });
        this.props.getProductData();
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

    handleClick(productId){
        this.props.handleClick(productId);
    }

    render(){
        const { productList, total } = this.state;
        return (
            <div className="product_list">
                {
                    productList.length >0 ? 
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={false}
                            dataSource={productList}
                            renderItem={item => (
                            <List.Item
                                key={item.ProductId}
                            >
                                <List.Item.Meta
                                title={
                                    <span className="showProductDetailBtn"  data-productid={item.ProductId} onClick={this.showProductDetail}>
                                        <img src={item.ImgUrl} alt=""/>
                                    </span>
                                }
                                description={item.Title}
                                />
                                {item.content}
                            </List.Item>
                            )}
                        /> 
                        : null
                }
                {
                    total >0 ? 
                        <Pagination 
                            total={total} 
                            pageSize={this.state.pageSize} 
                            current={this.state.pageNumber}
                            showSizeChanger 
                            showQuickJumper 
                            pageSizeOptions={['20','30','50','100']}
                            onChange={this.onPageNumberChange}
                            onShowSizeChange={this.onPageSizeChange}
                        />
                        : null
                }
            </div>
        )
    }
}

export default connect(
    state => ({
        productData: state.productData,
    }),{
        getProductData
    }
)(_List);