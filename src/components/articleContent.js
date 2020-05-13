import React, { Component } from 'react'
<<<<<<< HEAD
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Typography, Col, Row, Button, Divider, Layout } from 'antd'
import 'antd/dist/antd.css'
import '../css/articleContent.css'

import CommentPanel from './comment'

import FooterNamePlate from './Footer'

const { Text, Title} = Typography
const { Sider,Content } = Layout


=======

import '../css/articleContent.css'
>>>>>>> b6fcfa1f62f44ab41c66004ddce4d2f243888b1a

class ArticleContent extends Component{
    constructor(props){
        super(props)
<<<<<<< HEAD
        this.state = {
            _id: props.match.params.index,
            views: this.props.location.state.views,
            article: {},
            top: 650,
            loading_footer: false
        }
    }
    componentDidMount(){
        // console.log(this.props.match.params.index)
        // console.log(this.state._id)
        axios.get('http://localhost:8088/getOneArticle/'+this.props.match.params.index,{params:{views: this.state.views}}).then(res => {
        console.log(res.data)    
        console.log(res.data.article)
            this.setState({
                article: res.data.article,
                loading_footer: true
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
        <Sider>
            <div id="navitem">
                    <ul>
                        <li ><Link to="/" style={{'color':'white'}}>主页</Link></li>
                        <li><Link to="/blog" style={{'color':'white'}}>博客</Link></li>
                        <li><Link to="/board" style={{'color':'white'}}>留言</Link></li>
                        <li><Link to="/life" style={{'color':'white'}}>生活</Link></li>
                        <li><Link to="/" style={{'color':'white'}}>返回</Link></li>
                    </ul>
                    </div>
            </Sider>
        <Layout>
            <Content style={{ marginLeft: '6%',marginRight:'5%', background: '#fff', marginTop: '1rem',minHeight: 380 }}>
            <div className="article_warpper">
            {/* {this.props.match.params.index} {this.props.location.state.views} */}
                <Row>
                    <Col span={22} offset={1}>
                            <Title style={{paddingTop:'3rem',paddingBottom:'2rem'}} level={2}>{ articleTitle }</Title>
                            <Divider dashed orientation="left">
                            <Text style={{marginLeft:'1rem',fontFamily:'Arial',fontSize:'0.7rem'}}>作者: {author}</Text>
                            <Text style={{marginLeft:'0.5rem',fontFamily:'Arial',fontSize:'0.7rem'}}>日期: {createDate}</Text>
                            <Text style={{marginLeft:'1rem',fontFamily:'Arial',fontSize:'0.7rem'}}>阅读: {views || 0}</Text>
                            </Divider>
                            <Divider></Divider>
                            <div className="article_content" style={{fontFamily:'Arial'}} dangerouslySetInnerHTML = {{ __html: content}}>
                            </div> 
                            <Divider></Divider>
                            <CommentPanel />
                            <Divider></Divider>
                           
                    </Col> 
                </Row>
            </div>
            </Content>
            { this.state.loading_footer && <FooterNamePlate />}
        </Layout>
        </Layout>
=======
    }
    render(){
        return(
            <div>{this.props.match.params.index}
              <p>{this.props.location.search}</p>
            </div>
>>>>>>> b6fcfa1f62f44ab41c66004ddce4d2f243888b1a
        )
    }

}

export default ArticleContent