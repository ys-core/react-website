
import React, { Component } from 'react'
import { Result, Button } from 'antd'
import { withRouter } from 'react-router-dom'

class CommitSuccess extends Component{
    constructor(props){
      super(props)
    }
    goBack(){
      this.props.history.goBack(-1)
    }
    goHomepage(){
      this.props.history.push("/")
    }
    render(){
      return(
        <Result
        status="success"
        title="Saved the article to the mongodb database successfully !"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button type="primary" key="console" onClick={() => {this.goBack()}}>
            Go Back
          </Button>,
          <Button type="danger" key="buy" onClick={() => this.goHomepage()}>Go HomePage</Button>,
        ]}
      />
      )
    }
}

export default withRouter(CommitSuccess)