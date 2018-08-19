import * as member from './active-type.js';
import Immutable from 'immutable';

let defauleState = {
    addressList : [],
}

export const memberData = (state = defauleState , action) => {
    switch(action.type){
        case member.GETADDRESSLIST:
            return { ...state, ...action }
        default:
            return state    
    }
}