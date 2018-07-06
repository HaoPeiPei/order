import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import Routes from './routes/index.jsx';
import store from './store/store.js';
import './utils/config.js';
import registerServiceWorker from './registerServiceWorker';

const render = Component => {   // 增加react-hot-loader保持状态刷新操作，如果不需要可去掉并把下面注释的打开
    ReactDOM.render(
        <Provider store={store}>
            <Component  />
        </Provider>
        ,
        document.getElementById('root')
    );
};

render(Routes);
registerServiceWorker();
