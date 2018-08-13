import React from 'react';
import axios from 'axios';
import $ from 'jquery';

class GoldCanvas extends React.Component{
    constructor(props){
        super(props);
        debugger
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
            allImgItem: [],
            renderImgItem: (imgData) => {
                this.props.renderImgItem(imgData);
            }
        }
    }

    loadImg = () => {
        let img = new Image();
        img.src = '/Product/MakeImg?imgUrl=' + this.props.backgroundImg;
        img.width = 1000;
        img.height = 1000;
        if (1000 > img.width) {
            this.setState({
                imgScale: img.width / 1000,
            })
        };
        return img;
    }

    initCanvas = () =>{
        let _this = this;
        let ele = document.getElementById("ele")
        let ctx = ele.getContext("2d");
        _this.state.img.onload = function(){
            ctx.clearRect( 0, 0, _this.state.width, _this.state.height);
            ctx.beginPath();
            ctx.drawImage(_this.state.img, 0, 0, _this.state.width, _this.state.height);
            ctx.closePath();
            ctx.save();
        }
    }

    //裁剪图片并返回图片
    cutCanvasToImg = (img, imgScaleX, imgScaleY, imgScaleWidth, imgScaleHeight) => {
        var $oCanvas = $('<canvas class="oCanvas" style="max-width:100px;"></canvas>');
        var oCtx = $oCanvas[0].getContext("2d");
        var imgWidth = imgScaleWidth * this.state.imgScale;
        var imgHeight = imgScaleHeight * this.state.imgScale;
        var imgX = imgScaleX * this.state.imgScale;
        var imgY = imgScaleY * this.state.imgScale;
        $oCanvas[0].x = imgX;
        $oCanvas[0].y = imgY;
        $oCanvas[0].width = imgWidth;
        $oCanvas[0].height = imgHeight;
        oCtx.drawImage(img, imgX, imgY, imgWidth, imgHeight, 0, 0, imgWidth, imgHeight);
        oCtx.scale((1 / this.state.imgScale), (1 / this.state.imgScale));
        var newImg = new Image();
        newImg.src = $oCanvas[0].toDataURL('image/jpeg');
        newImg.rx = imgX;
        newImg.ry = imgY;
        newImg.width = imgWidth;
        newImg.height = imgHeight;
        newImg.sx = imgScaleX;
        newImg.sy = imgScaleY;
        newImg.sWidth = imgScaleWidth;
        newImg.sHeight = imgScaleHeight;
        var sid = new Date().getTime()
        newImg.sname = sid + ".jpg";
        newImg.sid = sid;
        this.setState({
            allImgItem: [...this.state.allImgItem,newImg]
        });
        return newImg;
    }

    componentDidMount(){
        this.initCanvas();
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
            let ele = document.getElementById("ele");
            let ctx = ele.getContext("2d");
            ctx.clearRect( 0, 0, this.state.width, this.state.height);
            ctx.beginPath();
            ctx.drawImage(this.state.img, 0, 0, this.state.width, this.state.height);
            ctx.closePath();
            ctx.save();
            let images = this.state.allImgItem;
            for (let i = 0; i < images.length; i++) {
                ctx.beginPath();
                ctx.strokeStyle = "#4bf209";
                ctx.rect(images[i]["sx"], images[i]["sy"], images[i]["sWidth"], images[i]["sHeight"]);
                ctx.closePath();
                ctx.stroke();
            }
            ctx.beginPath();
            ctx.strokeStyle = "#ff0000";
            ctx.rect(this.state.currentX, this.state.currentY, moveWidth, moveHeight);
            ctx.closePath();
            ctx.stroke();
        }
    }
    onmouseup = (e) => {
        let event=e||window.event;
        let images = this.state.allImgItem;
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
            this.state.renderImgItem(imgData);
        }
        this.setState({
            flag: false
        });
       
    }

    render(){
        return(
            <canvas 
                id="ele"
                width={this.state.width} 
                height={this.state.height} 
                onMouseDown={this.onmousedown} 
                onMouseMove={this.onmousemove} 
                onMouseUp={this.onmouseup} 
            />
        )
    }
}

export default GoldCanvas;