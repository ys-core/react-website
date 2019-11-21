import React, { Component, Fragment } from 'react'
import { Link , withRouter } from 'react-router-dom'
import $ from 'jquery'
import axios from 'axios'

import '../css/body.css'

import store from '../redux/redux.js'


import { Pagination, Typography, Col, Row, Popconfirm, Divider, Modal, Badge } from 'antd'
import 'antd/dist/antd.css'

const { Text, Title, Paragraph } = Typography
const { confirm } = Modal

class ArticleItem extends Component{
    constructor(props){
        super(props)
    }
    viewArticleDetails(){
        this.props.history.push("/article")
    }
    render(){
        const {article} = this.props
        return(
            <div>
               <div style={{border:'2px solid white', marginBottom:'1rem'}} >
                   <Row> 
                       <Col span={20} offset={1}>
                           <Title level={3}>{article.articleTitle}</Title>
                           <Text type="primary"  className="article_property" style={{"marginLeft":"2em","marginBottom":"2em","fontSize":"0.65rem"}} >author: {article.author}</Text>
                           <Text type="primary" className="article_property" style={{"marginLeft":"2em","marginBottom":"2em","fontSize":"0.65rem"}} >createDate: {article.createDate.substring(0,10).replace(/-/g,"/")}</Text>
                           <Text type="secondary" className="article_property" style={{"marginLeft":"2em","marginBottom":"2em","fontSize":"0.65rem"}} >category: {article.articleType || 'Null'}</Text><br/>
                           {/* <Paragraph ellipsis={{ rows:3, expandable: true }} style={{"textIndent":"2em","lineHeight":"28px"}}>{article.content}</Paragraph> */}
                           {/* <div className="article_body_warpper" key={article._id} dangerouslySetInnerHTML = {{ __html: article.content }}></div> */}
                           <Link to={{ pathname: '/article/'+article._id, state: { views:article.views || 0 }}}>
                              <div className="article_body_warpper" key={article._id} dangerouslySetInnerHTML = {{ __html: article.content }}></div>
                           </Link>
                           <Divider></Divider>
                       </Col>
                   </Row>
               </div>
            </div>
          )
    }
    
}

class ContentTemplate extends Component{
    constructor(props){
        super(props)
    }
    render(){ 
        // console.log(this.props.content)
        const content = this.props.content
        // console.log(content)
    return(
       <div>
          {content.map((article,index) => <ArticleItem key={index} article={article}/>)}
       </div>
    )
    }
}

class Body extends Component{
    constructor(props){
        super(props)
        let obtain_last_page = window.sessionStorage.getItem("last_view_page") // obtain previous pagination index from seesion storage when return back to homepage
        let login_status = window.sessionStorage.getItem("login_status")      // obtain the login status from session storage.
        let login_user = window.sessionStorage.getItem("login_user")          // the user that has logged in
        // let allArticles = window.sessionStorage.getItem("allArticles")         // save the articles in sessionStorage in case of requesting the server frequently
        this.state = { 
            article_num: 0,        //  pagination
            articles: [],
            currenetPage: JSON.parse(obtain_last_page) || 1,
            login_status: JSON.parse(login_status),
            logoff_window: false,
            login_user: login_user,
            avatar_color: login_status ? require('../image/avatar-on.png') : require('../image/avatar-off.png')
        }
    }
    componentDidMount(){
        console.log(store.getState())
       
        axios.get('http://localhost:8088/getAllArticles').then(res => {
            console.log("execute the axios function")
            // console.log(res.data.allArticles.length)
            this.setState({
                article_num: res.data.allArticles.length,
                articles: [...res.data.allArticles]
            })
            
        }).catch(err => {
            console.log(err)
        })
        // console.log(this.state.articles.length)
        console.log("login status is ", this.state.login_status)
        // console.log(this.state.allArticles)
        window.addEventListener('scroll', this.handleScrollEvent.bind(this))
        
    }
    componentWillUnmount(){
        window.removeEventListener('scroll',this.handleScrollEvent.bind(this))
        let session_storage = window.sessionStorage   // just for that still be the previous homepage status when return back to homepage not the Page 1, so save the page index in SessionStorage for later useage before leaving homepage.
        session_storage.setItem("last_view_page",this.state.currenetPage);
    }
    handleScrollEvent(event){
        // 滚动的高度
        const scrollTop = (event.srcElement ? event.srcElement.documentElement.scrollTop : false) || window.pageYOffset || (event.srcElement ? event.srcElement.body.scrollTop : 0);
        // 视窗高度
        // const clientHeight = (event.srcElement && event.srcElement.documentElement.clientHeight) || document.body.clientHeight;
        // 页面高度
        // const scrollHeight = (event.srcElement && event.srcElement.documentElement.scrollHeight) || document.body.scrollHeight;
        // 距离页面底部的高度
        // const height = scrollHeight - scrollTop - clientHeight;
        // 判断距离页面底部的高度
        // console.log(scrollTop,clientHeight,scrollHeight,height)
        if(scrollTop < 20 && this.refs.home_header){
            this.refs.home_header.style.display = 'block'
        }
        else{
            if(this.refs.home_header){
                this.refs.home_header.style.display = 'none'
            }
        }
    }
    handleClickAvatarEvent(){
        if(!this.state.login_status){
            this.props.history.push("/administrator")
        }else{
            // handle the layout event
            // confirm({
            //     title: 'Do you Want to delete these items?',
            //     content: 'Some descriptions',
            //     onOk() {
            //       console.log('OK');
            //       this.setState({
            //           login_status: false,
            //           login_user: null
            //       })
            //       window.sessionStorage.setItem("login_status",false)      
            //       window.sessionStorage.setItem("login_user",null) 
            //     },
            //     onCancel() {
            //       console.log('cancel logout.');
            //     },
            // });
        }
    }

    pageChange(page){
        // reset the content which should be displayed after the page index changed.
        this.setState({
            currenetPage: page,
        })
    }
    commonHandleHover(){
        $('.default_homepage').css({"color":"black","border-bottom":"0px solid tomato"})
    }
    commonHandleLeave(){
        $('.default_homepage').css({"color":"red","border-bottom":"2px solid tomato"})
    }
    render(){
        // const co ={
        //     title: "Nodejs Configuration",
        //     key: '2019_128',
        //     editTime: "24/08/2019",
        //     category: 'JavaScript',
        //     content: "学校源于1902年创建的三江师范学堂，历经国立中央大学、南京大学等发展时期；1952年由原南京大学、复旦大学、武汉大学、浙江大学、江南大学的有关系科组建南京工学院（现东南大学）食品工业系，1958年该系整建制东迁无锡，建立无锡轻工业学院，1995年更名为无锡轻工大学；2001年1月，经教育部批准，无锡轻工大学、江南学院、无锡教育学院合并组建江南大学；2003年，东华大学无锡校区并入江南大学。Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant UED Team."
        // }
        
        return(
           <div className="body_container">
               <div className="avatar"><img  src={this.state.avatar_color} onClick={this.handleClickAvatarEvent.bind(this)} alt=""/></div>
               <div className="header_container animated slideInDown" ref="home_header" >
                    <div className="header">
                        <div className="category_bar">
                          <ul>
                            <li className="default_homepage"><Link to="/" style={{textDecoration:'none'}}>HOMEPAGE</Link></li>
                            <li className="common_router" onMouseOut={()=>{this.commonHandleLeave()}} onMouseOver={()=>this.commonHandleHover()}><Link to="/blog" style={{textDecoration:'none'}}>BLOG</Link></li>
                            <li className="common_router" onMouseOut={()=>{this.commonHandleLeave()}} onMouseOver={()=>this.commonHandleHover()}><Link to="/article" style={{textDecoration:'none'}}>ARTICLE</Link></li>
                            <li className="common_router" onMouseOut={()=>{this.commonHandleLeave()}} onMouseOver={()=>this.commonHandleHover()}><Link to="/board" style={{textDecoration:'none'}}>BOARD</Link></li>
                            <li className="common_router" onMouseOut={()=>{this.commonHandleLeave()}} onMouseEnter={()=>this.commonHandleHover()}><Link to="/test" style={{textDecoration:'none'}}>CENTER</Link></li>
                            <li className="common_router" onMouseOut={()=>{this.commonHandleLeave()}} onMouseOver={()=>this.commonHandleHover()}><Link to="/administrator" style={{textDecoration:'none'}}>MORE..</Link></li>
                         </ul>
                        </div>
                    </div>
               </div>
               <div className="content_container animated bounceInUp">
                    <ContentTemplate content={this.state.articles} />
               </div>
               <Pagination size="small" simple current={this.state.currenetPage} onChange={this.pageChange.bind(this)} total={this.state.article_num} showQuickJumper />
               <br />
           </div>
        )
    }
}

export default withRouter(Body)