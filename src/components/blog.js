
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../css/blog.css'
import { List, Card, Avatar, Icon, Divider, Layout, Menu, Empty } from 'antd'

const { Header, Sider, Content, Footer } = Layout;
const articleType = ['Javascript','React','Vuejs','Angular','Nodejs','Flutter','Css','Other']

function ArticleList(props){
    const { articles } = props
    // console.log(articles)
    return <List grid={{ gutter: 16, column: 3 }}  dataSource={articles} renderItem={(item,index) => (
        <Link to={{ pathname: '/article/'+item._id, state: { views:item.views || 0 }}}>
            <List.Item key={index}>
    <Card hoverable headStyle={{'color':'blue'}} title={item.articleTitle}>{item.createDate.substring(0,10)}{'  ' + item.articleType}{' ' + item.views + ' visited'}</Card>
            </List.Item>
        </Link>
        )}
    ></List>
    
}

class Blog extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectType: 0,
            selectedKeys: '1',
            showNoData: true,
            articles: []
        }
    }
    switchArticleType(e){
       this.setState({
            selectedKeys: e.key
       })
       //allocate url router for each type
       
       // get the article type   articleType[e.key-1]
       axios.get('http://localhost:8088/getArticles/'+ articleType[e.key-1],{params:{type:articleType[e.key-1],typeArr:articleType}}).then(res => {
           if(res.data.status && res.data.articles.length > 0){
                const { articles } = this.state
                this.setState({
                    showNoData: false,
                    articles: res.data.articles
                })
               console.log(res.data.articles)
               
           }else{
               this.setState({showNoData: true})
           }
       }).catch(err => {
           console.log(err)
       })

       console.log(articleType[e.key-1])
    }
    render(){
        const { showNoData } = this.state
        return(
            <Fragment>
                <Layout>
                    <Sider style={{ overflow: 'auto', height: '100vh',position: 'fixed',left: 0 }}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" selectedKeys= {[this.state.selectedKeys]} defaultSelectedKeys={['3']} onClick={ this.switchArticleType.bind(this)}>
                        <Menu.Item key="1">
                        <Icon type="user" />
                        <span className="nav-text">JavaScript</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                        <Icon type="video-camera" />
                        <span className="nav-text">React</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                        <Icon type="upload" />
                        <span className="nav-text">VueJs</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                        <Icon type="bar-chart" />
                        <span className="nav-text">Angualr</span>
                        </Menu.Item>
                        <Menu.Item key="5">
                        <Icon type="cloud-o" />
                        <span className="nav-text">NodeJs</span>
                        </Menu.Item>
                        <Menu.Item key="6">
                        <Icon type="appstore-o" />
                        <span className="nav-text">Flutter</span>
                        </Menu.Item>
                        <Menu.Item key="7">
                        <Icon type="team" />
                        <span className="nav-text">Css</span>
                        </Menu.Item>
                        <Menu.Item key="8">
                        <Icon type="shop" />
                        <span className="nav-text">Other..</span>
                        </Menu.Item>
                    </Menu>
                    </Sider>
                    <Layout style={{ marginLeft: 200 }}>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight:'100vh', textAlign: 'center' }}>
                        {/* {showNoData && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                        {showNoData && <ArticleList articles={this.state.articles} />} */}
                        {showNoData ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : <ArticleList articles={this.state.articles} /> }
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>yongsonglee ©2019-{new Date().getFullYear()} Created by React</Footer>
                    </Layout>
                </Layout>
            </Fragment>
        )
    }
}

export default Blog