import axios from 'axios';
import * as cart from './active-type.js';

export const getCartList = () => {
    return dispatch =>
        axios.get(`/Cart/GetListCart`)
            .then(res=>{
                if (res.status == 200 && res.data.success) {
                    dispatch({
                        type: cart.GETCARTLIST,
                        cartList: res.data.data,
                    })
                }
            })
            .catch(err=>{
                console.log(err);
            });
}

export const removeCart = ({data, callBack}) => {
    axios.post(`/Cart/BatchDeleteCart`, data)
        .then(res=>{
            callBack && callBack(res.data);
        })
        .catch(err=>{
            console.log(err);
        });
}