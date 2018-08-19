import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux'

import * as home from './home/reducer.js';
import * as product from './product/reducer.js';
import * as cart from './cart/reducer.js';
import * as order from './order/reducer.js';
import * as manager from './member/reducer.js';

let store = createStore(
    combineReducers({
        router: routerReducer,
        ...home,
        ...product,
        ...cart,
        ...order,
        ...manager
    }),
    applyMiddleware(thunk)
);

export default store;