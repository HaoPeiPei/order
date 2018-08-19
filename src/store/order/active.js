import axios from 'axios';
import * as order from './active-type.js';

export const getOrderList = (data) => {
    return dispatch =>
        axios.post(`/Cart/GetListCart`, data)
        .then(res=>{
            if (res.status == 200 && res.data.success) {
                dispatch({
                    type: order.GETORDERLIST,
                    orderList: res.data.data,
                })
            }
        })
        .catch(err=>{
            console.log(err);
        });
}