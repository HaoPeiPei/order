import * as cart from './active-type.js';
import Immutable from 'immutable';

let defauleState = {
    cartList : [],
}

export const cartData = (state = defauleState , action) => {
    switch(action.type){
        case cart.GETCARTLIST:
            return { ...state, ...action }
        default:
            return state    
    }
}