import axios from 'axios';
import * as home from './active-type.js';

export const getSideBarData = () => {
    return dispatch =>{
        axios.get('/Content/data/sidebar.json?m_time=' + Date.now())
        .then(res => {
            if (res.status == 200 && res.data.length  > 0) {
                dispatch({
                    type: home.GETSIDEBAR,
                    sideBarList: res.data,
                })
            }
        })
        .catch(error => {
            console.log(error);
        })

    }
}