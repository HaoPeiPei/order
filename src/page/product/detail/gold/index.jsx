import React from 'react';
import { Form, Input, InputNumber, Radio, Modal, Cascader, Checkbox } from 'antd';

class Gold extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            productDetail: this.props.productDetail || {},
            imgList: [],
            img: {},
            canvas: {
                width: 500,
                height: 500
            },
            rect: {
                x: 0,
                y: 0,
                width: 0,
                heigth: 0,
                scale: 1,
                flag :false,
            }
        }
    }

    loadImg = () => {
        debugger
        let img = new Image();
        img.src = '/Product/MakeImg?imgUrl=' + this.state.productDetail['ImgUrl'];
        img.width = 1000;
        img.height = 1000;
        return img;
    }

    initCanvas = (imgSrc) =>{
        if(!!imgSrc){
            let _this = this;
            let img = new Image();
            img.src = '/Product/MakeImg?imgUrl=' + imgSrc;
            img.width = 1000;
            img.height = 1000;
            img.onload = function(){
                if (1000 > _this.state.canvas['width']) {
                    _this.setState({
                        img: img,
                        rect: Object.assign({}, _this.state.rect, {scale: 1000/_this.state.canvas['width']}),
                    })
                };
                let ele = document.getElementById("ele");
                let ctx = ele.getContext("2d");
                ele.width = _this.state.canvas['width'];
                ele.height = _this.state.canvas['height'];
                ctx.drawImage(_this.state.img, 0, 0, _this.state.canvas['width'], _this.state.canvas['height']);
            }
        }
    }

    componentWillReceiveProps(nextProps){
        if(!this.state.productDetail['ImgSrc']){
            this.initCanvas(nextProps.productDetail['ImgUrl']);
        }
        this.setState({
            productDetail: nextProps.productDetail
        })
    }

    onmousedown = (e) => {
        let event=e||window.event;
        event.preventDefault();
        event.stopPropagation()
        let x = e.clientX - document.querySelector('.detail').offsetLeft -document.querySelector('canvas').offsetLeft;
        let y = e.clientY -document.querySelector('.detail').offsetTop - document.querySelector('canvas').offsetTop;
        this.setState({
            rect: Object.assign({}, this.state.rect, {
                flag: true,
                x: x,
                y: y,
            })
        });
    }

    onmousemove = (e) => {
        let event=e||window.event;
        event.preventDefault();
        event.stopPropagation();
        if(this.state.rect['flag']){
            let width = e.clientX - document.querySelector('.detail').offsetLeft -document.querySelector('canvas').offsetLeft - this.state.rect['x'];
            let height = e.clientY -document.querySelector('.detail').offsetTop - document.querySelector('canvas').offsetTop - this.state.rect['y'];
            this.setState({
                rect: Object.assign({}, this.state.rect, {
                    width: width,
                    height: height,
                })
            });
            let ele = document.getElementById("ele")
            let ctx = ele.getContext("2d");
            ctx.clearRect( 0, 0, this.state.canvas['width'], this.state.canvas['height']);
            ctx.beginPath();
            ctx.drawImage(this.state.img, 0, 0, this.state.canvas['width'], this.state.canvas['height']);
            ctx.closePath();
            ctx.save();
            let imgList = this.state.imgList;
            for (let i = 0; i < imgList.length; i++) {
                ctx.beginPath();
                ctx.strokeStyle = "#4bf209";
                ctx.rect(imgList[i]["sx"], imgList[i]["sy"], imgList[i]["sWidth"], imgList[i]["sHeight"]);
                ctx.closePath();
                ctx.stroke();
                ctx.save();
            } 
            ctx.beginPath();
            ctx.strokeStyle = "#ff0000";
            ctx.rect(this.state.rect['x'], this.state.rect['y'], this.state.rect['width'], this.state.rect['height']);
            ctx.closePath();
            ctx.save();
            ctx.stroke();
        }
    }

    onmouseup = (e) => {
        let event=e||window.event;
        let images = this.state.imgList;
        let ele = document.getElementById("ele");
        let ctx = ele.getContext("2d");
        event.preventDefault();
        event.stopPropagation();
        let x = 0;
        let y = 0;
        let width = 0;
        let height = 0;
        if (!this.state.rect['flag']) {
            return;
        }
        if (this.state.rect['width'] < 50 || this.state.rect['height'] < 50) {
            return
        } else {
            let imgData = this.cutCanvasToImg(this.state.img, this.state.rect['x'], this.state.rect['y'], this.state.rect['width'], this.state.rect['height']); //裁剪图片
            this.addImgItem(imgData);
        }
        this.setState({
            rect: Object.assign({}, this.state.rect, {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                flag :false
            })
        });
    }

    //裁剪图片并返回图片
    cutCanvasToImg = (img, x, y, width, height) => {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext("2d");
        let imgWidth = width * this.state.rect['scale'];
        let imgHeight = height * this.state.rect['scale'];
        let imgX = x * this.state.rect['scale'];
        let imgY = y * this.state.rect['scale'];
        canvas.width = imgWidth;
        canvas.height = imgHeight;
        ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight, 0, 0, imgWidth, imgHeight);
        ctx.scale((1 / this.state.rect['scale']), (1 / this.state.rect['scale']));
        let newImg = new Image();
        newImg.src = canvas.toDataURL('image/jpeg');
        newImg.rx = imgX;
        newImg.ry = imgY;
        newImg.width = imgWidth;
        newImg.height = imgHeight;
        newImg.sx = x;
        newImg.sy = y;
        newImg.sWidth = width;
        newImg.sHeight = height;
        let sid = new Date().getTime()
        newImg.sname = sid + ".jpg";
        newImg.sid = sid;
        return newImg;
    }

    addImgItem = (imgData) =>{
        this.setState({
            imgList: [...this.state.imgList, imgData]
        })
    }

    removeImgItem = (e) => {
        let sid = e.target.getAttribute('data-sid');
        this.setState({
            imgList: this.state.imgList.filter(v => v.sid != sid)
        });
    }

    componentDidMount(){
        this.initCanvas(this.state.productDetail['ImgUrl']);
    }

    inputChange =(e) =>{
        let inputName  = e.target.name;
        let inputValue = parseInt(e.target.value);
        this.setState({
            productDetail: Object.assign({}, this.state.productDetail, { [inputName]: inputValue })
        })
    }

    onSubmit = () => {  
        this.props.onCancel()       
    }

    render(){
        const productDetail = this.state.productDetail;
        let images = productDetail.ImageAlbums || [];
        let _this = this;
        return (
            <Modal {...this.props} 
                className="detail goldDetail"
            >
                <div className = "detail_left">  
                    <canvas 
                        id="ele"
                        width={this.state.width} 
                        height={this.state.height} 
                        onMouseDown={this.onmousedown} 
                        onMouseMove={this.onmousemove} 
                        onMouseUp={this.onmouseup} 
                    />
                </div>
                <div className="detail_right">
                    <div className="product_title">
                        <h2 className="goodTitle">{productDetail['Title']}</h2>
                        <div>
                            <span className="goodsNo">款号：{productDetail['GoodsNo']} </span>
                            <span>类别：{productDetail['CategoryName']}</span>
                        </div>
                    </div>
                    <div className="imgInfo_list_wrap">
                        {
                            this.state.imgList.length >0 
                            ? <ul id="imgInfo_list" className="imgInfo_list">
                                {this.state.imgList.map(function(item, index){
                                    return <li key={item['sid']} className="imgInfo_item active clearfix">
                                                <div className="img_wrap"><img className="img" src={item['src']} /></div>
                                                <div className="input_wrap">
                                                    <div className="weight_range">
                                                        <div className="start_wrap">
                                                            <input className="weightA" data-title="克重"  type="number" defaultValue={1} />
                                                            <span className="unit">g</span>
                                                        </div>
                                                        <span className="line">-</span>
                                                        <div className="end_wrap">
                                                            <input className="weightB" data-title="克重" type="number" defaultValue={1} />
                                                            <span className="unit">g</span>
                                                        </div>
                                                    </div>
                                                    <div className="num_wrap">
                                                        <i className="iconfont icon-jian"></i>
                                                        <input className="quantity" data-title="数量" type="number"  defaultValue={1}  />
                                                        <i className="iconfont icon-jia"></i>
                                                    </div>
                                                </div>
                                                <div data-sid={item['sid']} onClick={_this.removeImgItem}  className="btn btn-xs remove_btn">×</div>
                                            </li>
                                })}
                                <a href="javascript:;" className="reset_btn">清空</a>
                            </ul>
                            :  <img className="cartTip" src={require('../../../../assets/images/cartTip_icon.png')} alt="" />
                        }
                    </div>
                    <a className="addCart_btn" onClick={ this.onSubmit }>
                        <img src="../Content/images/addCart_icon.png" alt="" />
                        <span>下单</span>
                    </a>
                </div>
            </Modal>
            )
    }
}

export default Gold
