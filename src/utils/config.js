import axios from 'axios';
import { message } from 'antd';

let loading = null;
let needLoadingRequestCount = 0
axios.interceptors.request.use(function(config){

    if(needLoadingRequestCount == 0){
        loading = message.loading('加载中...', 0);
    };
    needLoadingRequestCount++;
    return config;
});

axios.interceptors.response.use(function(config){
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        loading();
    }
    
    return config;
});