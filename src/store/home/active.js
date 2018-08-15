import axios from 'axios';
import * as home from './active-type.js';

export const getBrand = () => {
    return dispatch =>{
        axios.get(`/Home/GetBrand`)
            .then(res => {
                if (res.status == 200 && res.data.success) {
                    dispatch({
                        type: home.GETBRAND,
                        brandData: res.data.data,
                    })
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
}