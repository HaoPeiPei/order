import cloneDeep from 'lodash.clonedeep';
import { message, Modal } from 'antd';
import axios from 'axios';

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
export function queryArray(array, key, keyAlias = 'key') {
    if (!(array instanceof Array)) {
        return null
    }
    const item = array.filter(_ => _[keyAlias] === key)
    if (item.length) {
        return item[0]
    }
    return null
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
export function arrayToTree(array, id = 'id', pid = 'pid', children = 'children') {
    let data = cloneDeep(array)
    let result = []
    let hash = {}
    data.forEach((item, index) => {
        hash[data[index][id]] = data[index]
    })

    data.forEach((item) => {
        let hashVP = hash[item[pid]]
        if (hashVP) {
            !hashVP[children] && (hashVP[children] = [])
            hashVP[children].push(item)
        } else {
            result.push(item)
        }
    })
    return result
}

export function checkArray(options){
    var t = !0;
    return(void 0 == options || "" == options || "null" == options || "undefined" == options) && (t = !1, message.error("您没有选中任何项,请您选中后再操作。")), t
}

export const remove = ({url, data, callBack}) => {
    Modal.confirm({
        title: '信息',
        okText: '确认',
        content: '注：您确定要删除吗？该操作将无法恢复。',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
            axios.post(url, data)
                .then(res=>{
                    callBack && callBack(res.data);
                })
                .catch(err=>{
                    console.log(err);
                });
        }
    })
}

export const save = ({url, data, callBack}) => {
    axios.post(url, data)
        .then(res=>{
            callBack && callBack(res.data);
        })
        .catch(err=>{
            console.log(err);
        });
}

export const request = ({url, data, type='get', callBack}) => {
    if(type == 'get'){
        axios.get(url)
        .then(res=>{
            callBack && callBack(res.data);
        })
        .catch(err=>{
            console.log(err);
        });
    }else if(type == 'post'){
        axios.post(url, data)
            .then(res=>{
                callBack && callBack(res.data);
            })
            .catch(err=>{
                console.log(err);
            });
    }
}

export const logout= (callBack) => {
    Modal.confirm({
        title: '提示',
        okText: '确认',
        content: '注：您确定要安全退出本次登录吗？',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
            axios.post(`/Login/Logout`)
                .then(res=>{
                    if (res.status == 200 && res.data.success) {
                        callBack && callBack(res.data);
                    }
                })
                .catch(err=>{
                    console.log(err);
                });
        }
    })
}

export const login= (data ,callBack) => {
    axios.post(`/Login/CheckLogin`, data)
        .then(res=>{
            debugger
            if (res.status == 200 && res.data.success) {
                callBack && callBack(res.data);
            }
        })
        .catch(err=>{
            console.log(err);
        });
}