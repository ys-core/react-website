import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Comment, Icon, Tooltip, Avatar, Input, Button, Popconfirm, message } from 'antd';
import moment from 'moment';

import '../css/board.css'

import FooterNamePlate from './Footer'

const { TextArea } = Input


class LeftBar extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="leftbar">
                <div id="navitem">
                <ul>
                    <li ><Link to="/" style={{'color':'white'}}>主页</Link></li>
                    <li><Link to="/blog" style={{'color':'white'}}>博客</Link></li>
                    <li><Link to="/board" style={{'color':'white'}}>留言</Link></li>
                    <li><Link to="/life" style={{'color':'white'}}>生活</Link></li>
                    <li><Link to="/" style={{'color':'white'}}>返回</Link></li>
                </ul>
                </div>
            </div>
        )
    }
}

class CommentItem extends Component{
    constructor(props){
        super(props)
        this.state = {
          _id: this.props.comment._id,
          likes: this.props.comment.likes || 0,
          dislikes: this.props.comment.dislikes || 0,
          action: null,
      };
    }
    componentWillReceiveProps(){

    }
    like = () => {
        // console.log(this.state._id)
        const { _id, likes} = this.state
        axios.post('http://localhost:8088/board/comment_likes',{
            _id, likes
        }).then(res => {
          // console.log(res.data.comment)
          if(res.data.status){
              this.setState({
                likes: res.data.comment.likes,
                action: 'liked',
              });
          }
        }).catch(err => {
          console.log(err)
        })

    };
    
    dislike = () => {
      // console.log(this.state._id)
      const { _id, dislikes} = this.state
      axios.post('http://localhost:8088/board/comment_dislikes',{
          _id, dislikes
      }).then(res => {
        // console.log(res.data.comment)
        if(res.data.status){
            this.setState({
              dislikes: res.data.comment.dislikes,
              action: 'disliked',
            });
        }
      }).catch(err => {
        console.log(err)
      })
    };
    
    render() {
        const { likes, dislikes, action } = this.state;
        const actions = [
          <span key="comment-basic-like">
            <Tooltip title="Like">
              <Icon
                type="like"
                theme={action === 'liked' ? 'filled' : 'outlined'}
                onClick={this.like}
              />
            </Tooltip>
            <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
          </span>,
          <span key=' key="comment-basic-dislike"'>
            <Tooltip title="Dislike">
              <Icon
                type="dislike"
                theme={action === 'disliked' ? 'filled' : 'outlined'}
                onClick={this.dislike}
              />
            </Tooltip>
            <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
          </span>,
          <span key="comment-basic-reply-to">Reply to</span>,
        ];
        const { comment, username, avatar,commentDate} = this.props.comment
        const formatDate = commentDate.replace('T',' ').substring(0,19)
        return (
        <Comment actions={actions} author={<a>{username + ' ' + (this.props.storey + 1) + '楼'}</a>} avatar={ <Avatar src="" alt="匿名" /> }
          className="comments"
            content={
              <p>
               {comment}
              </p>
            }
            datetime={
              <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                {/* <span>{moment().fromNow()}</span> */}
                <span>{moment(formatDate, "YYYY-MM-DD HH:mm:ss").fromNow()}</span>
              </Tooltip>
            }
          />
        );
    }
}


class Board extends Component{
    constructor(props){
        super(props)
        let login_user = window.sessionStorage.getItem("login_user")
        this.state={
            username: login_user || null,
            comment: "既然来过, 那么就留下你的脚印呗...",
            allcomments: [],
            loading_footer: false
        }
    }
    componentWillUnmount(){
        
    }
    shouldComponentUpdate(){
        return true
    }
    componentDidMount(){
      // console.log(new Date())
        axios.get('http://localhost:8088/getAllBoardComments/').then(res => {
            if(res.status === 200 && res.data.status === 'true'){
              // console.log(res.data.comments)
              this.setState({
                allcomments : res.data.comments,
                loading_footer : true
              })
            }
        }).catch(err => {
            console.log(err)
        })

        
    }
    handleInputEvent = e => {
        // console.log(e.target.value)
        this.setState({
            comment: e.target.value
        })
    }
   
    comment = () => {
      const { comment } = this.state
      console.log(new Date())
      const username = this.state.username || '匿名'
      if(this.state.comment){
        axios.post('http://localhost:8088/add_board_comment',{
          username, comment,
          avatar: '匿名',
          commentDate: new Date(),
          likes: 0,
          dislikes: 0,
        }).then(res => {
          console.log(res.data.status)
          if(res.data.status === 'true'){
                const commentSuccess = message.success('留言成功')
                setTimeout(commentSuccess,1500)
                axios.get('http://localhost:8088/getAllBoardComments/').then(res => {
                    if(res.status === 200 && res.data.status === 'true'){
                    // console.log(res.data.comments)
                    this.setState({
                      comment: '',
                      // allcomments : [res.data.comments[0], ...this.state.allcomments]
                      allcomments: [...res.data.comments]
                    })
                     }
                }).catch(err => {
                  console.log(err)
                 })
          }
        }).catch(err => {
          console.log(err)
        })
      }


    }
    cancelComment = () => {
        // console.log('cancel comment')
    }
    submitComment = () => {
        const { username, comment } = this.state
        if(!this.state.username){
          console.log('没有登陆')
          const failure = message.error('你还未登录,是需要匿名留言么？')
          setTimeout(failure,1500)
        }else if(this.state.comment){
          axios.post('http://localhost:8088/add_board_comment',{
            username, comment,
            avatar: '匿名',
            commentDate: new Date(),
            likes: 0,
            dislikes: 0,
          }).then(res => {
            console.log(res.data.status)
            if(res.data.status === 'true'){
                  const commentSuccess = message.success('留言成功')
                  setTimeout(commentSuccess,1500)
                  axios.get('http://localhost:8088/getAllBoardComments/').then(res => {
                      if(res.status === 200 && res.data.status === 'true'){
                      console.log(res.data.comments)
                      this.setState({
                        comment: '',
                        allcomments : [...res.data.comments]
                      })
                       }
                  }).catch(err => {
                    console.log(err)
                   })
            }
          }).catch(err => {
            console.log(err)
          })
        }


    }
    render(){
     
        const { allcomments } = this.state
        const commentItemNumber = allcomments.length      // 为每一条comment item设置Key时注意从大到小,否则第一条item的likes,dislikes会加到第二条item上去,因为diff算法受key的影响
        console.log(commentItemNumber)
        return(
           <div id="board_warpper">
               <LeftBar />
               <div className="textArea">
                    <TextArea rows={10} defaultValue={this.state.comment} onChange={this.handleInputEvent.bind(this)} /><br /><br />
                    <Popconfirm title={this.state.username ? ' 确认留言么? ' : ' 确定匿名留言么? ' }s
                          onConfirm={ this.comment }
                          onCancel={ this.cancelComment }
                          okText="确定"
                          cancelText="取消"
                    >
                      <Button type="danger" >留言</Button>
                    </Popconfirm>
                    
               </div>
               
                <div className="comment">
                {allcomments.map((item,index) => {
                        return <CommentItem comment={item} key={commentItemNumber-index} storey={index}/>
                })}
                </div>
                { this.state.loading_footer && <FooterNamePlate />}
           </div>
        )
    }
}



export default Board