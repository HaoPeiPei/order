import React from 'react';
import axios from 'axios';
import $ from 'jquery';

class GoldCanvas extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            width: 500,
            height: 500,
            flag: false,
            currentX: 0,
            currentY:0,
            moveWidth: 0,
            moveHeight: 0,
            imgScale: 1,
            imgWidth: 1000,
            imgHeight: 1000,
            img: this.loadImg(),
            imgList: this.props.imgList,
        }
    }
    
    loadImg = () => {
        let img = new Image();
        img.src = '/Product/MakeImg?imgUrl=' + this.props.backgroundImg;
        img.width = 1000;
        img.height = 1000;
        return img;
    }

    initCanvas = () =>{
        let _this = this;
        _this.state.img.onload = function(){
            if (_this.state.imgWidth > _this.state.width) {
                _this.setState({
                    imgScale: _this.state.imgWidth / _this.state.width,
                })
            };
            _this.drawRects(_this.state.imgList);
        }
    }

    drawRects = (imgList) => {
        let ele = document.getElementById("ele")
        let ctx = ele.getContext("2d");
        ctx.clearRect( 0, 0, this.state.width, this.state.height);
        ctx.beginPath();
        ctx.drawImage(this.state.img, 0, 0, this.state.width, this.state.height);
        ctx.closePath();
        ctx.save();
        for (let i = 0; i < imgList.length; i++) {
            ctx.beginPath();
            ctx.strokeStyle = "#4bf209";
            ctx.rect(imgList[i]["sx"], imgList[i]["sy"], imgList[i]["sWidth"], imgList[i]["sHeight"]);
            ctx.closePath();
            ctx.stroke();
        }
    }

    //裁剪图片并返回图片
    cutCanvasToImg = (img, currentX, currentY, moveWidth, moveHeight) => {
        let $oCanvas = $('<canvas class="oCanvas" style="max-width:100px;"></canvas>');
        let oCtx = $oCanvas[0].getContext("2d");
        let imgWidth = moveWidth * this.state.imgScale;
        let imgHeight = moveHeight * this.state.imgScale;
        let imgX = currentX * this.state.imgScale;
        let imgY = currentY * this.state.imgScale;
        $oCanvas[0].x = imgX;
        $oCanvas[0].y = imgY;
        $oCanvas[0].width = imgWidth;
        $oCanvas[0].height = imgHeight;
        oCtx.drawImage(img, imgX, imgY, imgWidth, imgHeight, 0, 0, imgWidth, imgHeight);
        oCtx.scale((1 / this.state.imgScale), (1 / this.state.imgScale));
        let newImg = new Image();
        newImg.src = $oCanvas[0].toDataURL('image/jpeg');
        newImg.rx = imgX;
        newImg.ry = imgY;
        newImg.width = imgWidth;
        newImg.height = imgHeight;
        newImg.sx = currentX;
        newImg.sy = currentY;
        newImg.sWidth = moveWidth;
        newImg.sHeight = moveHeight;
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
        })
    }

    componentDidMount(){
        this.initCanvas();
    }

    componentWillReceiveProps(nextProps){
        this.drawRects(nextProps.imgList)
    }
    
    onmousedown = (e) => {
        let event=e||window.event;
        event.preventDefault();
        event.stopPropagation()
        let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        this.setState({
            flag: true,
            currentX: e.clientX - document.querySelector('.detail').offsetLeft -document.querySelector('canvas').offsetLeft,
            currentY: e.clientY -document.querySelector('.detail').offsetTop - document.querySelector('canvas').offsetTop,
        });
    }

    onmousemove = (e) => {
        let event=e||window.event;
        event.preventDefault();
        event.stopPropagation();
        if(this.state.flag){
            let moveWidth = e.clientX - document.querySelector('.detail').offsetLeft -document.querySelector('canvas').offsetLeft - this.state.currentX;
            let moveHeight = e.clientY -document.querySelector('.detail').offsetTop - document.querySelector('canvas').offsetTop - this.state.currentY;
            this.setState({
                moveWidth: moveWidth,
                moveHeight: moveHeight,
            });
            let ele = document.getElementById("ele")
            let ctx = ele.getContext("2d");
            ctx.drawImage(this.state.img, 0, 0, this.state.width, this.state.height);
            ctx.beginPath();
            ctx.strokeStyle = "#ff0000";
            ctx.rect(this.state.currentX, this.state.currentY, this.state.moveWidth, this.state.moveHeight);
            ctx.closePath();
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
        if (!this.state.flag) {
            return;
        }
        if (this.state.moveWidth < 0) {
            x = this.state.currentX + this.state.moveWidth;
            width = Math.abs(this.state.moveWidth);
        }
        if (this.state.moveHeight < 0) {
            y = this.state.currentY + this.state.moveHeight;
            height = Math.abs(this.state.moveHeight);
        }
        if (this.state.moveWidth < 50 || this.state.moveHeight < 50) {
            ctx.clearRect( 0, 0, this.state.width, this.state.height);
            ctx.beginPath();
            ctx.drawImage(this.state.img, 0, 0, this.state.width, this.state.height);
            ctx.closePath();
            ctx.save();
            for (var i = 0; i < images.length; i++) {
                ctx.beginPath();
                if (i == images.length - 1) {
                    ctx.strokeStyle = "#ff0000";
                } else {
                    ctx.strokeStyle = "#4bf209";
                }
                ctx.rect(images[i]["sx"], images[i]["sy"], images[i]["sWidth"], images[i]["sHeight"]);
                ctx.closePath();
                ctx.stroke();
            }
            return
        } else {
            let imgData = this.cutCanvasToImg(this.state.img, this.state.currentX, this.state.currentY, this.state.moveWidth, this.state.moveHeight); //裁剪图片
            this.addImgItem(imgData);
        }
        this.setState({
            flag: false
        });
    }

    render(){
        let _this = this;
        let imgList = this.state.imgList.length >0 
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
            :  <img className="cartTip" src={require('../../assets/images/cartTip_icon.png')} alt="" />

        return(
            <div>
                <canvas 
                    id="ele"
                    className = "detail_left"
                    width={this.state.width} 
                    height={this.state.height} 
                    onMouseDown={this.onmousedown} 
                    onMouseMove={this.onmousemove} 
                    onMouseUp={this.onmouseup} 
                />
                <div className="imgInfo_list_wrap">
                    {imgList}
                </div>
            </div>
        )
    }
}

export default GoldCanvas;