import React from 'react';
import { connect} from 'react-redux';
import { Table, Pagination } from 'antd';
import { getUserList } from '../../../store/member/active.js';
import './index.scss';

class Members extends React.Component{

	constructor(props){
		super(props);
		this.columns = [
			{
				title: '头像',
				name: 'Avatar',
				dataIndex: 'Avatar',
				render: (text)=> {
					return <div className="img_warp">
						<img src={text && (text.split('?x-oss-process')[0]+`?x-oss-process=image/resize,m_fill,w_100,h_100`)} alt=""/>
					</div>
				}
			}, {
				title: '登录名',
				name: 'UserName',
				dataIndex: 'UserName',
				render: (text ,record) => {
					return <div>
						<span>{text}</span>
						{record["IsSys"] == 1 ? <span class="badge">系统</span> :  null}
					</div>			
				}
			}, {
				title: '真实姓名',
				name: 'Contact',
				dataIndex: 'Contact',
			},{
				title: '手机号码',
				name: 'Mobile',
				dataIndex: 'Mobile',
			}, {
				title: '分组名称',
				name: 'GroupName',
				dataIndex: 'GroupName',
			}, {
				title: '创建时间',
				name: 'CreateDate',
				dataIndex: 'CreateDate',
			}
		];
		this.state = {
			userParam: {
				sort: "CreateDate",
				order: "desc",
				pageNumber: 1,
				pageSize: 20,
			}
		}
	}

	componentDidMount(){
		this.props.getUserList(this.state.userParam);
	}

	onPageNumberChange = (pageNumber, pageSize) => {
		this.setState({
            userParam: Object.assign({}, this.state.userParam, {
                pageNumber: pageNumber,
                pageSize: pageSize
            })
        },()=>{
            this.props.getUserList(this.state.userParam);
        })
	}

	onPageSizeChange = (pageNumber, pageSize) => {
		this.setState({
            userParam: Object.assign({}, this.state.userParam, {
                pageNumber: pageNumber,
                pageSize: pageSize
            })
        },()=>{
            this.props.getUserList(this.state.userParam);
        })
	}

	rowKey = (record) => {
		return record['CustomerContactId']
	}

	render(){
		const total = this.props.memberData.total;
		const userList = this.props.memberData.userList;
		const pagination = {
			total: total,
			pageSize: this.state.userParam.pageSize,
			current: this.state.userParam.pageNumber,
			pageSizeOptions: ['20','30','50','100'],
			onChange: this.onPageNumberChange,
			onShowSizeChange: this.onPageSizeChange,
			showSizeChanger: true,
			showQuickJumper: true,
		}
		return (
			<Table  className="members_list"
				rowKey={this.rowKey}
				columns={this.columns} 
				dataSource={userList} 
				pagination={pagination}
			/>
		)
	}
}

export default connect(
	state => ({
		memberData: state.memberData
	}),{
		getUserList
	}
)(Members);