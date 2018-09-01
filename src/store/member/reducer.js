import * as member from './active-type.js';
import Immutable from 'immutable';

let defauleState = {
    addressList : [],
    userList: [],
    user: {},
    countOrderGoldTypeList: [],
    countProduct: {}
}

export const memberData = (state = defauleState , action) => {
    switch(action.type){
        case member.GETADDRESSLIST:
            return { ...state, ...action }
        case member.GETUSERLIST:
            return { ...state, ...action }
        case member.GETUSER:
            return { ...state, ...action }
        case member.GETCOUNTORDERGOLDTYPELIST:
            return { ...state, ...action }
        case member.GETCOUNTPRODUCT:
            return { ...state, ...action }
        default:
            return state    
    }
}