import React from 'react';
import axios from 'axios';
 
import './index.scss';

class Login extends React.Component{
    constructor(props){
        super(props),
        this.state={
            username : '',
            password : '',
            verifycode : ''
        }
    }

    //用户名改变的时候
    onInputChange(e){
        let inputValue = e.target.value,
            inputName  = e.target.name;
        this.setState({         
            [inputName] : inputValue
        })
    }

    //提示信息
    formMessage(msg){
        document.querySelector('.error_box').innerHTML =' <i class="fa fa-question-circle"></i><span >' + msg + '</span>';
    }

    // 点击登录
    onSubmit(e){
        let username = this.state.username;
        let password = this.state.password;
        let verifycode = this.state.verifycode;
        if (username == "") {
            this.formMessage('请输入账户。');
            return false;
        } else if (password == "") {
            this.formMessage('请输入密码。');
            return false;
        } else if (verifycode == "") {
            this.formMessage('请输入验证码。');
            return false;
        }

        axios.post("Login/CheckLogin", {
            username: username, 
            password: password,
           verifycode: verifycode
        })
        .then(res=>{
            if(res.data.success){
                this.props.history.push('/');
            }
        }).catch(err=>{

        })
        
    }
    componentWillMount(){
        document.title = '登录'
    }
    onInputKeyUp(e){
        if(e. keyCode === 13){
            this.onSubmit();
        }
    }
    render(){
        return(
            <div id="login">
                <section>
                    <form>
                        <h3 className="title">欢迎登陆</h3>
                        <div className="form_group userName_box">
                            <i className="iconfont icon-user"></i>
                            <input type="text" 
                                name="username"
                                onKeyUp ={(e) => {this.onInputKeyUp(e)}}
                                placeholder="请输入用户名"
                                onChange={(e)=>{this.onInputChange(e)}}/>
                        </div>
                        <div className="form_group password_box">
                            <i className="iconfont icon-password"></i>
                            <input type="password" 
                                name="password" 
                                placeholder="请输入密码" 
                                onKeyUp ={(e) => {this.onInputKeyUp(e)}}
                                onChange={(e)=>{this.onInputChange(e)}}/>
                        </div>
                        <div className="form_group code_box">
                            <input type="text" 
                                name="verifycode"
                                onKeyUp ={(e) => {this.onInputKeyUp(e)}}
                                placeholder="请输入用户名"
                                onChange={(e)=>{this.onInputChange(e)}}
                                maxLength="4" 
                                className="css_code" 
                                placeholder="请输入验证码"/>
                            <img src="/Login/VerifyCode"  id="img_code" className="img_code" alt="点击切换验证码" title="点击切换验证码" />
                        </div>
                        <div className="form_group error_box"></div>
                        <div className="form_group">
                            <input type="button" id="login_btn" value="登陆" onClick={(e)=>{this.onSubmit(e)}}/>
                        </div>
                    </form>
                </section>
                <footer>
                </footer>
            </div>
        );
    }
}
export default Login; 