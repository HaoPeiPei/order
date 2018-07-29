import React from 'react';

import './index.scss';

class Info extends React.Component{
    render(){
        return (
            <ul className="info_list">
                <li className="clearfix">
                    <div className="title">头像</div>
                    <div className="img_wrap">
                        <img id="avatar" src={require('../../../assets/images/personal_avatar.png')} alt="" />
                    </div>
                    <a href="javascript:;" className="btn changAvatarBtn">
                        <span>修改</span>
                        <input type="file" id="FileInfo" name="FileInfo" className="fileUpload" />
                    </a>
                </li>
                <li className="clearfix">
                    <div className="title">真实姓名</div>
                    <div className="info">'+ user['Contact'] +'</div>
                </li>
                <li className="clearfix">
                    <div className="title">手机号码</div>
                    <div className="info">'+ user['Mobile'] +'</div>
                    <a href="javascript:;" data-value="'+ user['Mobile'] +'" className="btn changePhoneBtn">修改</a>
                </li>
                <li className="clearfix">
                    <div className="title">登录账号</div>
                    <div className="info">'+ user['UserName'] +'</div>
                </li>
                <li className="clearfix">
                    <div className="title">登录密码</div>
                    <div className="info">
                        <input type="password" readOnly value="'+ user['UserPassword'] +'" />
                    </div>                   
                </li>
            </ul>             
        )
    }
}

export default Info;