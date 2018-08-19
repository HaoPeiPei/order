import axios from 'axios';
import * as member from './active-type.js';

export const getAddressList = (data) => {
    return dispatch => 
        axios.post(`/Member/GetListAddress`, data)
            .then(res=>{
                if (res.status == 200 && res.data.success) {
                    dispatch({
                        type: member.GETADDRESSLIST,
                        addressList: res.data.data,
                    })
                }
            })
            .catch(err=>{
                console.log(err);
            });
}