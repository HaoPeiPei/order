import * as product from './action-type.js';
import Immutable from 'immutable';

let defauleState = {
    productList : [],
    total: 0,
    productSearchList : [],
    productDetail: {}
}

export const productData = (state = defauleState , action) => {
    switch(action.type){
        case product.GETPRODUCT:
            return { ...state, ...action }
        case product.GETPRODUCTSEARCH:
            return { ...state, ...action }
        case product.GETPRODUCTDETAIL:
            return { ...state, ...action }
        default:
            return state    
    }
}