import * as home from './active-type.js';

let defaultState = {
    sideBarList: []
}
export const homeData = (state = defaultState, action)=>{
    switch(action.type){
        case home.GETSIDEBAR:
            return {...state, ...action }
        default:
         return state
    }
}