

import React from 'react'
import  { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import '../css/index.css';
import App from '../App';
import Profile from '../components/profile'
import LoginPanel from '../components/loginpanel'
import RegisterPanel from '../components/registerpanel'
import EditArticle from '../components/editArticle'
import ArticleContent from '../components/articleContent'
import Notfound from '../components/notfound'
// import Test from '../components/Test'
// import Life from '../components/life'
import Demo from '../components/demo'
import CommitSuccess from '../components/commitSuccess'


import Board from '../components/board'
import Blog from '../components/blog'


const router = (
    <Router>
        <Switch>
            <Route exact path="/" component={App}></Route>
            <Route exact path="/blog" component={Blog}></Route>
            <Route exact path="/blog/:index" component={Blog}></Route>
            <Route exact path="/article" component={EditArticle}></Route>
            <Route exact path="/article/:index" component={ArticleContent}></Route>
            <Route exact path="/board" component={Board}></Route>
            {/* <Route exact path="/life" component={Life}></Route> */}
            <Route exact path="/more" component={Profile}></Route>
            <Route exact path="/account/login" component={LoginPanel}></Route>
            <Route exact path="/account/registration" component={RegisterPanel}></Route>
            <Route exact path="/account/find_password" component={RegisterPanel}></Route>
            <Route eaact path="/commit_successful" component={CommitSuccess}></Route>
        </Switch>
    </Router>

)

export default router