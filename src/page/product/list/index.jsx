import React from 'react';
import  { connect } from 'react-redux';
import { List, Pagination } from 'antd';

import { getProductData } from '../../../store/product/action.js';


class _List extends React.Component{
    constructor(props){
        super(props)
        this.state={
            productList: this.props.productData.productList || [],
            pageNumber: this.props.pagination.pageNumber || 1,
            pageSize: this.props.pagination.pageSize || 20,
            total: this.props.productData.total || 0,
            onPageChange: this.props.onPageChange
        }
    }

    componentDidMount(){

    }

    componentWillReceiveProps(nextProps){
        this.setState({
            productList: nextProps.productData.productList || [],
            pageNumber: nextProps.pagination.pageNumber || 1,
            pageSize: nextProps.pagination.pageSize || 20,
            total: nextProps.productData.total || 0,
        })
    }

    showProductDetail=(e)=>{
        const productId = e.target.parentNode.getAttribute('data-productid');
        this.props.showProductDetail(productId);
    }

    //分页跳转
    onPageNumberChange = (pageNumber, pageSize) => {
        this.state.onPageChange({pageNumber, pageSize});
    }

    //改变分页大小
    onPageSizeChange= (pageNumber, pageSize)=>{
        this.state.onPageChange({pageNumber,pageSize});
    }

    handleClick(productId){
        this.props.handleClick(productId);
    }

    render(){
        const { productList, total, pageSize,  pageNumber} = this.state;
        return (
            <div className="product_list">
                {
                    productList.length >0 
                        ? <List
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
                    total >0 
                        ? <Pagination 
                            total={total} 
                            pageSize={pageSize} 
                            current={pageNumber}
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