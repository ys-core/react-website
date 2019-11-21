import React, { Component } from 'react'
import axios from 'axios'

import { Typography, Col, Row, Affix, Button, Divider, Layout } from 'antd'
import 'antd/dist/antd.css'
import '../css/articleContent.css'

import CommentPanel from './comment'


const { Text, Title} = Typography
const { Content } = Layout



class ArticleContent extends Component{
    constructor(props){
        super(props)
        this.state = {
            _id: props.match.params.index,
            views: this.props.location.state.views,
            article: {},
            top: 650
        }
    }
    componentDidMount(){
        // console.log(this.props.match.params.index)
        // console.log(this.state._id)
        axios.get('http://localhost:8088/getOneArticle/'+this.props.match.params.index,{params:{views: this.state.views}}).then(res => {
        console.log(res.data)    
        console.log(res.data.article)
            this.setState({
                article: res.data.article
            })
        }).catch(err => {
            console.log(err)
        })
    }
    back(){
        console.log("hello")
        this.props.history.goBack(-1)
    }
    render(){
        const { articleTitle,articleType,content,author,createDate,starsNum,views } = this.state.article
        return(
        <Layout>
            <Content style={{ padding: '0 50px', background: '#fff', marginTop: '2rem',minHeight: 380 }}>
            <div className="article_warpper">
            {/* {this.props.match.params.index} {this.props.location.state.views} */}
                <Affix offsetTop={this.state.top}>
                    <Button type="primary" onClick={() => this.back()}> Return</Button>
                </Affix>
                <Row>
                    <Col span={22} offset={2}>
                            <Title style={{paddingTop:'3rem',paddingBottom:'2rem'}} level={2}>{ articleTitle }</Title>
                            <Divider dashed orientation="left">
                            <Text mark style={{marginLeft:'1rem',background:'red',fontSize:'0.7rem'}}>Publisher: {author}</Text>
                            <Text style={{marginLeft:'0.5rem',fontSize:'0.7rem'}}>Date: {createDate}</Text>
                            <Text style={{marginLeft:'1rem',fontSize:'0.7rem'}}>Views: {views || 0}</Text>
                            </Divider>
                            <Divider></Divider>
                            <div className="article_content" dangerouslySetInnerHTML = {{ __html: content}}>
                            </div> 
                            <Divider></Divider>
                            <CommentPanel />
                    </Col> 
                </Row>
            </div>
            </Content>
        </Layout>
        )
    }

}

export default ArticleContent