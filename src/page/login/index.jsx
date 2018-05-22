import React from 'react';

import './index.scss';

class Login extends React.Component{
    constructor(props){
        super(props),
        this.state={
            username : '',
            password : '',
        }
    }
    
    render(){
        return(
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="panel panel-default login-panel">
                        <div className="panel-heading">
                            <h3 className="panel-title">欢迎登录-LUMALL管理系统</h3>
                        </div>
                        <div className="panel-body">
                            <div>
                                <div className="form-group">
                                    <input type="text" name="username" 
                                        className="form-control" 
                                        onKeyUp ={(e) => {this.onInputKeyUp(e)}}
                                        placeholder="请输入用户名"
                                        onChange={(e)=>{this.onInputChange(e)}}/>
                                </div>
                                <div className="form-group">
                                    <input type="password" name="password" 
                                        className="form-control" 
                                        placeholder="请输入密码" 
                                        onKeyUp ={(e) => {this.onInputKeyUp(e)}}
                                        onChange={(e)=>{this.onInputChange(e)}}/>
                                </div>
                                <button className="btn btn-default btn-lg btn-primary btn-block"
                                    onClick={(e)=>{this.onSubmit(e)}}>登录</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login; 