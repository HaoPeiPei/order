import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import * as home from './home/reducer.js';
import * as product from './product/reducer.js';
import * as manager from './manager/reducer.js';

let store = createStore(
    combineReducers({
        ...product,
        ...home,
        ...manager
    }),
    applyMiddleware(thunk)
);

export default store;