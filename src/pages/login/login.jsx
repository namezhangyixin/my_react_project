import React, { Component } from 'react'
import {Form,Icon,Input,Button,Checkbox } from 'antd';
import axios from 'axios'
import logo from './imges/logo.png'
import './css/login.less'
const {Item} = Form

class Login extends Component {

	//自定义密码效验器
	passwordValidator =(rule,value,callback)=>{
     if(!value){
        callback('密码必须输入')
	 }else if(value.length >12){
		 callback('密码必须小于等于12位')
	 }else if(value.length < 4){
		 callback('密码必须大于等于4位')
	 }else if(!(/^\w+$/).test(value)){     //方法是test
       callback('密码必须是英文，数字，下划线组成')
	 }else{
		 callback()
	 }
	}
        //注释////////////////////////////////////
	handleSubmit = (event)=>{
		event.preventDefault()
		this.props.form.validateFields((err,values)=>{
			// console.log(123);

		if(!err){
			const {username,password} = values
			//console.log('发送了网络请求',values)
			axios.post('http://localhost:3000/login',`username=${username}&password=${password}`).then(
				(response)=>{console.log(response.data)},
				(error)=>{console.log(error)}
			)
		}
	 });
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		//console.log(this.props);
		return (
			<div id="login">
				<div className="header">
					<img src={logo} alt="logo"/>
					<h1>商品管理系统</h1>
				</div>
				<div className="content">
					<h1>用户登录</h1>
					<Form onSubmit={this.handleSubmit} className="login-form">
						<Item> 
					
							{
								getFieldDecorator('username', {
									rules: [
										{required: true, message: '用户名必须输入'},
										{max:12,message: '用户名必须小于等于12位'},
										{min:4,message: '用户名必须大于等于4位'},
										{pattern:/^\w+$/,message: '用户名必须是英文、数字或下划线组成'}
									]
								})(
									<Input
										prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
										placeholder="用户名"
									/>,
								)
							}
						</Item>
						<Item>
						  {
							  getFieldDecorator('password',{
								  rules:[
                                       {validator:this.passwordValidator}
							  ]})(
								<Input
								prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
								type="password"
								placeholder="密码"
							/>
							  )

						  }
						</Item>
						<Item>
							<Button type="primary" htmlType="submit" className="login-form-button">
								登录
							</Button>
						</Item>
					</Form>
				</div>
			</div>
		)
	}
}

export default Form.create()(Login);



