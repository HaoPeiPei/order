import React from 'react';
import axios from 'axios';

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
            backgroundImg: this.props.backgroundImg,
            imgScale: 1,
            imgWidth: 1000,
            imgHeight: 1000,
            img: {}
        }
        
    }

    initCanvas = () =>{
        let ele = document.getElementById("ele")
        let ctx = ele.getContext("2d");
        let img = new Image();
        let width = this.state.width;
        let imgWidth = this.state.imgWidth;
        let imgHeight = this.state.imgWidth;
        img.src = '/Product/MakeImg?imgUrl=' + this.state.backgroundImg;
        img.width = this.state.width;
        img.height = this.state.height;
        img.onload = function () {           
            if (width > imgWidth) {
                this.setState({
                    imgScale: imgWidth / width,
                    img: img
                })
            }
            ctx.beginPath();
            ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
            ctx.closePath();
            ctx.save();
        };
    }

    componentDidMount(){
        this.initCanvas();
    }

    onmousedown = (e) => {
        let event=e||window.event;
        event.preventDefault();
        let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        this.setState({
            flag: true,
            currentX: e.pageX || e.clientX + scrollX,
            currentY: e.pageY || e.clientY + scrollY,
        })
    }

    onmousemove = (e) => {
        let event=e||window.event;
        event.preventDefault();
        let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        if(this.state.flag){
            let moveWidth = e.pageX || e.clientX + scrollX - this.state.currentX;
            let moveHeight = e.pageY || e.clientY + scrollY - this.state.currentY;
            this.setState({
                moveWidth: moveWidth,
                moveHeight: moveHeight,
            });
            let ele = document.getElementById("ele")
            let ctx = ele.getContext("2d");
            ctx.beginPath();
            ctx.strokeStyle = "#ff0000";
            ctx.rect(this.state.currentX, this.state.currentY, moveWidth, moveHeight);
            ctx.closePath();
            ctx.stroke();
        }
    }
    onmouseup = (e) => {
        let event=e||window.event;
        event.preventDefault();
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