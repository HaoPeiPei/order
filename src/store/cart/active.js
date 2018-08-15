import axios from 'axios';
import * as cart from './active-type.js';

export const getCartList = (url, data) => {
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