import React from 'react';
import axios from 'axios';

class List extends React.Component{
    handleClick(product){
        this.props.handleClick(product)
    }

    render(){
        return (
            <ul className="product_list" id="proList">
                {
                    this.props.productList.map((product, index) => {
                        let imgUrl =  product.imgUrl.split('?x-oss-process')[0];
                        return (
                            <li className="proItem" key={index}>
                                <a className="img"  onClick={() => this.handleClick(product)}  href="javascript:;" >
                                    <img src={imgUrl} alt="" />
                                </a>
                                <p className="info">
                                <span className="product_name">数字女戒</span>
                                <a className="collect_btn" href="javascript:;">
                                    <img src={require('../images/proCollect_icon.jpg')} alt=""/>
                                </a> 
                                </p>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

export default List;