import * as order from './active-type.js';
import Immutable from 'immutable';

let defauleState = {
    orderList : [],
}

export const orderData = (state = defauleState , action) => {
    switch(action.type){
        case order.GETORDERLIST:
            return { ...state, ...action }
        default:
            return state    
    }
}