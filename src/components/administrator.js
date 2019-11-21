
import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import $ from 'jquery'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import red from '@material-ui/core/colors/red';
import '../css/administrator.css'

import axios from 'axios'



class Administrator extends Component {

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
        this.generateRandomColorValue()
    }
    generateRandomColorValue(){
        for(let i = 0; i < 4; i++ ){
            let r = Math.floor(Math.random()*255);let g = Math.floor(Math.random()*255);let b = Math.floor(Math.random()*255);
            let value = 'rgba('+r+','+g+','+b+')';
            $('.circle_bombing > li:eq('+i+')').css("background",value)
        }
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
            axios.post("http://localhost:8088/verify_admin",{username,password}).then(res => {
                console.log(res)
                if(res.data.status == 'true'){
                    console.log(res.data.username)
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
        console.log(this.props.history)
        return(
            <Fragment>
                <h1>Administrator Login Center</h1>
                <span className="return_btn" onClick={this.goBack.bind(this)}>Back</span>
                <div className="login_panel">
                      <div className="signin">
                        <Input autoFocus type="string" placeholder="username or email" fullWidth onChange={this.inputUsername.bind(this)}></Input><br/><br/><br/>
                        <Input placeholder="password" type="password" fullWidth onChange={this.inputPassword.bind(this)}></Input><br/><br/><br/><br/>
                        <Button color="secondary" fullWidth variant="contained" onClick={this.signIn.bind(this)}>Sign In</Button><br/><br/><br/><br/>
                        <Link to="/administrator/find_password" style={{textDecoration:'none'}}><span className="forget_password">forget password ?</span></Link>
                      </div>
                      <div className="circle_bombing"><li></li><li></li><li></li><li></li></div>
                </div>
            </Fragment>
        )
    }
}

export default withRouter(Administrator)