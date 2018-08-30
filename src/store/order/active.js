import axios from 'axios';
import * as order from './active-type.js';

export const getListOrder = (data) => {
    return dispatch =>
        axios.post(`/Order/GetListOrder`, data)
            .then(res=>{
                if (res.status == 200 && res.data.success) {
                    dispatch({
                        type: order.GETLISTORDER,
                        orderList: res.data.data.rows,
                        total: res.data.data.total
                    })
                }
            })
            .catch(err=>{
                console.log(err);
            });
}

export const getOrderStatusNames = () => {
    return dispatch => 
        axios.get(`GetOrderStatusNames`)
            .then(res=>{
                if(res.status == 200 && res.data.success){
                    dispatch({
                        type: order.GETORDERSTATUSNAMES,
                        orderCountNums: res.data.data
                    })
                }
            })
            .catch(err=>{
                console.log(err);
            }) 
}

export const getCountOrderNums = () => {
    return dispatch => 
        axios.get(`getCountOrderNums`)
            .then(res=>{
                if(res.status == 200 && res.data.success){
                    dispatch({
                        type: order.GETCOUNTORDERNUMS,
                        orderCountNums: res.data.data
                    })
                }
            })
            .catch(err=>{
                console.log(err);
            }) 
}