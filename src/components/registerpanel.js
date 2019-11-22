
import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import '../css/registerpanel.css'
import { Radio, message } from 'antd'
import axios from 'axios'



class RegistrationPanel extends Component {

    constructor(props){
        super(props)
        this.state = {
            username: '',
            email: '',
            gender: '',
            password: '',
            repassword: ''
        }
    }
    componentWillMount(){
    }
    componentDidMount(){
        
    }
    goBack(){
        this.props.history.goBack(-1)
    }
    inputUsername(e){
        const username = e.target.value;
        this.setState({
            username
        })
    }
    inputEmail(e){
        const email = e.target.value;
        this.setState({
            email
        })
    }
    inputPassword(e){
        const password = e.target.value;
        this.setState({
            password
        })
    }
    setGende(e){
        const gender = e.target.value;
        this.setState({
            gender
        })
    }
    inputComfirmedPassword(e){
        const repassword = e.target.value;
        this.setState({
            repassword
        })
    }
    signIn(){
        let { username, email, password, gender,repassword } = this.state
        let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(username.length < 5){
            console.log(' username length is less than 5')
            const username_error = message.error('用户名长度太短,请重新输入')
            setTimeout(username_error,1500)
            return
        }
        if(!pattern.test(email)){
            console.log(' email error')
            const email_error = message.error('邮箱格式错误,请重新输入')
            setTimeout(email_error,1500)
            return
        }
        if(password.length < 8){
            console.log(' password length is less than 8')
            const password_error = message.error('密码长度太短,请重新输入')
            setTimeout(password_error,1500)
            return
        }
        if(!gender){
            console.log(' gender value is null')
            const gender_error = message.error('未选择性别,请选择')
            setTimeout(gender_error,1500)
            return
        }
        if(password !== repassword){
            console.log(' password does not match')
            const password_error = message.error('2次密码不匹配,请重新输入')
            setTimeout(password_error,1500)
            return
        }
        if(username && email && password){
            axios.post("http://localhost:8088/add_user",{username, password, email, gender, tag: 0}).then(res => {
                // console.log(res)
                if(res.data.status == 'true'){
                    const add_user_success = message.success('注册账号成功,请返回登陆')
                    setTimeout(add_user_success,1500)
                    this.props.history.goBack(-1)
                }
            }).catch(err => {
                console.log(err)
            })
        }else{
            console.log("input info errors")
        }
    }
    render(){
        // console.log(this.props.history)
        return(
            <div className="container">
                <h1>Create Account Center</h1>
                <span className="return_btn" onClick={this.goBack.bind(this)}>Back</span>
                <div className="register_panel">
                      <div className="register">
                        <Input autoFocus type="string" placeholder="username, not less than 5 chars" fullWidth onChange={this.inputUsername.bind(this)}></Input><br/><br/><br/>
                        <Input type="string" placeholder="email" fullWidth onChange={this.inputEmail.bind(this)}></Input><br/><br/><br/>
                        <Input placeholder="password, not less than 8 chars" type="password" fullWidth onChange={this.inputPassword.bind(this)}></Input><br/><br/><br/>
                        <Radio.Group onChange={this.setGende.bind(this)} value={this.state.gender}>
                            <Radio value={"male"}>Male</Radio>
                            <Radio value={"female"}>Female</Radio>
                        </Radio.Group><br /><br /><br />
                        <Input placeholder="password comfirmation required" type="password" fullWidth onChange={this.inputComfirmedPassword.bind(this)}></Input><br/><br/><br/>
                        <Button color="secondary" fullWidth variant="contained" onClick={this.signIn.bind(this)}>Register Account</Button><br/><br/><br/>
                        <Link to="/account/find_password" style={{textDecoration:'none','color':'black'}}><span className="forget_password">忘记密码 ?</span></Link>
                        {/* <Link to="/account/login" style={{textDecoration:'none', float: 'right'}}><span className="forget_password">返回登陆</span></Link> */}
                        <span className="forget_password" onClick={this.goBack.bind(this)} style={{textDecoration:'none', float: 'right'}}>返回登陆</span>
                      </div>
                     
                </div>
            </div>
        )
    }
}

export default withRouter(RegistrationPanel)