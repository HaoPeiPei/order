import * as order from './active-type.js';
import Immutable from 'immutable';

let defauleState = {
    orderList : [],
    orderStatusNames: [],
    orderCountNums: [],
    total: 0
}

export const orderData = (state = defauleState , action) => {
    switch(action.type){
        case order.GETLISTORDER:
            return { ...state, ...action }
        case order.GETORDERSTATUSNAMES:
            return { ...state, ...action }
        case order.GETCOUNTORDERNUMS:
            return { ...state, ...action }
        default:
            return state    
    }
}