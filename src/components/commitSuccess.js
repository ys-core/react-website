
import React, { Component } from 'react'
import { Result, Button } from 'antd'
<<<<<<< HEAD
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
=======

export default class CommitSuccess extends Component{
    constructor(props){
        super(props)
    }
    goBack(){

>>>>>>> b6fcfa1f62f44ab41c66004ddce4d2f243888b1a
    }
    render(){
      return(
        <Result
        status="success"
        title="Saved the article to the mongodb database successfully !"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
<<<<<<< HEAD
          <Button type="primary" key="console" onClick={() => {this.goBack()}}>
            Go Back
          </Button>,
          <Button type="danger" key="buy" onClick={() => this.goHomepage()}>Go HomePage</Button>,
=======
          <Button type="primary" key="console" onClick={()=>{this.goBack()}}>
            Go Back
          </Button>,
          <Button type="danger" key="buy">Go HomePage</Button>,
>>>>>>> b6fcfa1f62f44ab41c66004ddce4d2f243888b1a
        ]}
      />
      )
    }
<<<<<<< HEAD
}

export default withRouter(CommitSuccess)
=======
}
>>>>>>> b6fcfa1f62f44ab41c66004ddce4d2f243888b1a
