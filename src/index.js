import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';
import Routes from './routes/index.jsx';
import store from './store/store.js';
import './utils/config.js';
import registerServiceWorker from './registerServiceWorker';

const App = props => (
    <Provider store={store}>
        <Routes />
    </Provider>
)

ReactDOM.render(<App />,document.getElementById('root'));
registerServiceWorker();
