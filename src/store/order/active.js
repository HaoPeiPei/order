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

export const getOrderDetailData = (orderId) => {
    return dispatch =>
        axios.post(`/Order/GetOrder`, {
            OrderId: orderId
        })
            .then(res=>{
                if (res.status == 200 && res.data.success) {
                    dispatch({
                        type: order.GETORDERDETAIL,
                        orderDetail: res.data.data,
                    })
                }
            })
            .catch(err=>{
                console.log(err);
            });
}

export const getOrderStatusNames = () => {
    return dispatch => 
        axios.get(`/Order/GetOrderStatusNames`)
            .then(res=>{
                if(res.status == 200 && !(JSON.stringify(res.data) == "{}")){
                    dispatch({
                        type: order.GETORDERSTATUSNAMES,
                        orderStatusNames: res.data
                    })
                }
            })
            .catch(err=>{
                console.log(err);
            }) 
}

export const getCountOrderNums = () => {
    return dispatch => 
        axios.get(`/Order/getCountOrderNums`)
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

export const editOrder = (data,callBack) => {
    axios.post(`/Order/EditOrder`, data)
        .then(res=>{
            if(res.status == 200 && res.data.success){
                callBack && callBack(res.data);
            }
        })
        .catch(err=>{
            console.log(err);
        }) 
}

