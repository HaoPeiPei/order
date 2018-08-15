import axios from 'axios';
import * as product from './action-type.js';

export const getProductData = (queryJson) => {
    return dispatch =>
        axios.post(`/Product/GetProductList`, queryJson)
            .then(res=>{
                if (res.status == 200 && res.data.success) {
                    dispatch({
                        type: product.GETPRODUCT,
                        productList: res.data.data.data,
                        total: res.data.data.recordCount
                    })
                }
            })
            .catch(err=>{
                console.log(err);
            })
}

export const getProductSearch = (queryJson) => {
    return dispatch =>
        axios.post('/Product/GetProductSearch', queryJson)
            .then(res=>{
                if (res.status == 200 && res.data.success) {
                    dispatch({
                        type: product.GETPRODUCTSEARCH,
                        productSearchList: res.data.data,
                    })
                }
            })
            .catch(err=>{
                console.log(err);
            });
}

export const getProductDetailData = (productId) => {
    return   dispatch=>
        axios.post('/Product/GetProduct',{
            ProductId: productId
        })
            .then(res=>{
                if (res.status == 200 && res.data.success) {
                    dispatch({
                        type: product.GETPRODUCTDETAIL,
                        productDetail: res.data.data,
                    });          
                    
                };
            })
            .catch(err=>{
                console.log(err);
            });
}