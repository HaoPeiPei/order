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

export const getUserList = (data) => {
    return dispatch => 
        axios.post(`/Member/GetUserPageList`, data)
            .then(res=>{
                if (res.status == 200 && res.data.success) {
                    dispatch({
                        type: member.GETUSERLIST,
                        userList: res.data.data.rows,
                        total: res.data.data.total,
                    })
                }
            })
            .catch(err=>{
                console.log(err);
            });
}

export const getUser = () => {
    return dispatch => 
        axios.post(`/Member/GetUser`)
            .then(res=>{
                if (res.status == 200 && res.data.success) {
                    dispatch({
                        type: member.GETUSER,
                        user: res.data.data,
                    })
                }
            })
            .catch(err=>{
                console.log(err);
            });
}

export const getCountOrderGoldTypeList= (data) => {
    return dispatch => 
        axios.post(`/Order/GetCountOrderGoldTypeItem`, data)
            .then(res=>{
                if (res.status == 200 && res.data.success) {
                    dispatch({
                        type: member.GETCOUNTORDERGOLDTYPELIST,
                        countOrderGoldTypeList: res.data.data,
                    })
                }
            })
            .catch(err=>{
                console.log(err);
            });
}

export const getCountProduct= (data) => {
    return dispatch => 
        axios.post(`/Order/GetCountProduct`, data)
            .then(res=>{
                if (res.status == 200 && res.data.success) {
                    dispatch({
                        type: member.GETCOUNTPRODUCT,
                        countProduct: res.data.data,
                    })
                }
            })
            .catch(err=>{
                console.log(err);
            });
}