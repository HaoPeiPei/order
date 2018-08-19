import React from 'react';
import { message, Modal } from 'antd';

class ProductImg extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
	}
	hideModal = () =>{
		this.props.hideModal()
    }
    
    drawMarkImg =(url) => {
        let img = new Image();
        img.src = url;
        img.width = '1000';
        img.height = '1000';
        img.onload= () => {
            this.drawRect(img);
        };
    }

    drawRect = (img) =>{
        let scale = 1;
        let x = this.props.rect['x'];
        let y = this.props.rect['y'];
        let w = this.props.rect['w'];
        let h = this.props.rect['h'];
        let canvas = document.querySelector('#canvas');
        let canvasWidth = canvas.width;
        let canvasHeight = canvas.height;
        if (img.width > canvasWidth) {
            scale = img.width / canvasWidth;
        }
        let ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
        ctx.closePath();
        ctx.save();
        let bgImgData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        ctx.putImageData(bgImgData, 0, 0);
        ctx.beginPath();
        ctx.strokeStyle = "#ff0000";
        ctx.rect(x/scale, y/scale, w/scale, h/scale);
        ctx.closePath();
        ctx.stroke();
    }

    render(){
        let { title,width, height, markNum, imgUrl, rect, productImgUrl, visible } = this.props;
        return (
            <Modal
                title={title}
                visible={visible}
                onCancel={this.hideModal}
                width={width}
				footer={null}
            >
            {
                !!markNum 
                    ?   <div className="productImage clearfix">
                            <div style={{width:300,height:626,overflow:'hidden',textAlign:'center'}} className="pull-left">
                                <h3 style={{background:'#F5F5F5',margin:0}}>商品小图-{markNum}</h3>
                                <img style={{maxWidth: 300}} src={imgUrl}/>
                            </div> 
                            <div style={{width:600,height:626,overflow:'hidden',textAlign:'center'}} className="pull-left">
                                <h3 className="margin0 padding10" style={{background:'#F5F5F5',margin:0}}>标识图</h3>
                                <canvas id="canvas" width="600" height="600"></canvas>
                                {this.drawMarkImg(`/Product/MakeImg?imgUrl=${productImgUrl}?x-oss-process=image/resize,m_fill,w_1000,h_1000`)}
                            </div>
                        </div>
                    :   <div style={{display:'inline-block'}} >
                            <img width="100%" src={`${imgUrl}?x-oss-process=image/resize,m_fill,w_1000,h_1000`}/>
                        </div>
            }
           </Modal>
        )
    }
}

export default ProductImg;