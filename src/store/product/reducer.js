import * as product from './action-type.js';
import Immutable from 'immutable';

let defauleState = {
    productList : [],
    goldTypeList : [],
    categoryList : [],
    productDetail: {}

}

export const productData = (state = defauleState , action) => {
    switch(action.type){
        case product.GETPRODUCT:
            return { ...state, ...action }
        case product.GETGOLDTYPE:
            return { ...state, ...action }
        case product.GETCATEGORY:
            return { ...state, ...action }
        case product.GETPRODUCTDETAIL:
            return { ...state, ...action }
        default:
            return state    
    }
}