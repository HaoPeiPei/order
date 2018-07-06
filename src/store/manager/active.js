import axios from 'axios';
import * as order from './active-type.js';

export const getOrderList = (url, data) => {
    return dispatch =>
        axios.post(url,data)
        .then(res=>{
            debugger
            if (res.status == 200 && res.data.length  > 0) {
                dispatch({
                    type: order.GETORDERLIST,
                    categoryList: res.data,
                })
            }
        })
        .catch(err=>{
            console.log(err);
        });
}