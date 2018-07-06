import axios from 'axios';
import * as product from './action-type.js';

export const getProductData = (url, queryJson) => {
    return dispatch =>
        axios.post(url, {
            "pageNumber":1,
            "pageSize":20,
            "queryJson": JSON.stringify(queryJson),
        })
        .then(res=>{
            if (res.data.success) {
                dispatch({
                    type: product.GETPRODUCT,
                    productList: res.data.data.rows,
                })
            }
        })
        .catch(err=>{
            console.log(err);
        })
}

export const getGoldTypeData = () => {
    return dispatch =>
        axios.get('/BaseParam/GetGoldType')
        .then(res=>{
            if (res.status == 200 && res.data.length  > 0) {
                dispatch({
                    type: product.GETGOLDTYPE,
                    goldTypeList: res.data,
                })
            }
        })
        .catch(err=>{
            console.log(err);
        });
}

export const getCategoryData = () => {
    return dispatch =>
        axios.get('/BaseParam/GetCategory')
        .then(res=>{
            if (res.status == 200 && res.data.length  > 0) {
                dispatch({
                    type: product.GETCATEGORY,
                    categoryList: res.data,
                })
            }
        })
        .catch(err=>{
            console.log(err);
        });
}

export const getProductDetailData = (id) => {
    return   dispatch=>
        axios.post('/Products/GetGoldStockForm',{
            keyValue: id
        })
        .then(res=>{
            if (res.status == 200 && res.data.success) {
                dispatch({
                    type: product.GETPRODUCTDETAIL,
                    productDetail: res.data.data.product,
                });          
                
            };
        })
        .catch(err=>{
            console.log(err);
        });
}