import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux'

import * as home from './home/reducer.js';
import * as product from './product/reducer.js';
import * as cart from './cart/reducer.js';
import * as manager from './manager/reducer.js';

let store = createStore(
    combineReducers({
        router: routerReducer,
        ...product,
        ...cart,
        ...home,
        ...manager
    }),
    applyMiddleware(thunk)
);

export default store;