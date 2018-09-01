import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../../store/member/active.js';
import './index.scss';

class Info extends React.Component{
    constructor(props){
        super(props);
    }
    
    componentDidMount(){
        this.props.getUser();
    }

    render(){
        const user = this.props.memberData.user;
        console.log(user)
        return (
            <ul className="info_list">
                <li className="clearfix">
                    <div className="title">头像</div>
                    <div className="info">
                        <div className="img_wrap">
                            <img id="avatar" src={require('../../../assets/images/personal_avatar.png')} alt="" />
                        </div>
                        <a href="javascript:;" className="btn changAvatarBtn">
                            <span>修改</span>
                            <input type="file" id="FileInfo" name="FileInfo" className="fileUpload" />
                        </a>
                    </div>
                </li>
                <li className="clearfix">
                    <div className="title">真实姓名</div>
                    <div className="info">{user['Contact']}</div>
                </li>
                <li className="clearfix">
                    <div className="title">手机号码</div>
                    <div className="info">
                        <span>{user['Mobile']}</span>
                        <a href="javascript:;" data-value={user['Mobile']} className="btn changePhoneBtn">修改</a>
                    </div>
                </li>
                <li className="clearfix">
                    <div className="title">登录账号</div>
                    <div className="info">{user['UserName']}</div>
                </li>
                <li className="clearfix">
                    <div className="title">登录密码</div>
                    <div className="info">
                        <input type="password" readOnly value={!user['UserPassword']?'':user['UserPassword']} />
                        <a href="javascript:;" data-value={user['Mobile']} className="btn changePhoneBtn">修改</a>                 
                    </div>  
                </li>
            </ul>             
        )
    }
}

export default connect(
    state => ({
        memberData: state.memberData
    }), {
        getUser
    }   
)(Info);