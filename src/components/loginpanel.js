
import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import '../css/loginpanel.css'

import axios from 'axios'



class LoginPanel extends Component {

    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
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
            username: username
        })
    }
    inputPassword(e){
        const password = e.target.value;
        this.setState({
            password: password
        })
    }
    signIn(){
        let { username,password } = this.state
        if(username && password){
            axios.post("http://localhost:8088/verify_user",{username,password}).then(res => {
                if(res.data.status == 'true'){
                    const { status, username } = res.data
                    window.sessionStorage.setItem("login_status", status)
                    window.sessionStorage.setItem("login_user", username)
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
                <h1>Administrator/User Login Center</h1>
                <span className="return_btn" onClick={this.goBack.bind(this)}>Back</span>
                <div className="login_panel">
                      <div className="signin">
                        <Input autoFocus type="string" placeholder="username or email" fullWidth onChange={this.inputUsername.bind(this)}></Input><br/><br/><br/>
                        <Input placeholder="password" type="password" fullWidth onChange={this.inputPassword.bind(this)}></Input><br/><br/><br/><br/>
                        <Button color="secondary" fullWidth variant="contained" onClick={this.signIn.bind(this)}>Sign In</Button><br/><br/><br/><br/>
                        <Link to="/account/find_password" style={{textDecoration:'none'}}><span className="forget_password">忘记密码 ?</span></Link>
                        <Link to="/account/registration" style={{textDecoration:'none', float: 'right'}}><span className="forget_password">注册账号</span></Link>
                      </div>
                     
                </div>
            </div>
        )
    }
}

export default withRouter(LoginPanel)