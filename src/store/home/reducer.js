import * as home from './active-type.js';

let defaultState = {
    brandData: {}
}
export const homeData = (state = defaultState, action)=>{
    switch(action.type){
        case home.GETBRAND:
            return {...state, ...action }
        default:
         return state
    }
}