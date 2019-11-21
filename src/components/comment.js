import React, { Component } from 'react'

// class Comment extends Component{
//     constructor(props){
//         super(props)
//     }
//     render(){
//         return(
//             <div></div>
//         )
//     }
// }

// export default Comment

// import { Comment, Avatar, Form, Button, List, Input } from 'antd';
// import moment from 'moment';

// const { TextArea } = Input;

// const CommentList = ({ comments }) => (
//   <List
//     dataSource={comments}
//     header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
//     itemLayout="horizontal"
//     renderItem={props => <Comment {...props} />}
//   />
// );

// const Editor = ({ onChange, onSubmit, submitting, value }) => (
//   <div>
//     <Form.Item>
//       <TextArea rows={4} onChange={onChange} value={value} />
//     </Form.Item>
//     <Form.Item>
//       <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
//         Add Comment
//       </Button>
//     </Form.Item>
//   </div>
// );

// class CommentPanel extends Component {
//   state = {
//     comments: [],
//     submitting: false,
//     value: '',
//   };

//   handleSubmit = () => {
//     if (!this.state.value) {
//       return;
//     }

//     this.setState({
//       submitting: true,
//     });

//     setTimeout(() => {
//       this.setState({
//         submitting: false,
//         value: '',
//         comments: [
//           {
//             author: 'Han Solo',
//             avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//             content: <p>{this.state.value}</p>,
//             datetime: moment().fromNow(),
//           },
//           ...this.state.comments,
//         ],
//       });
//     }, 1000);
//   };

//   handleChange = e => {
//     this.setState({
//       value: e.target.value,
//     });
//   };

//   render() {
//     const { comments, submitting, value } = this.state;

//     return (
//       <div>
//         {comments.length > 0 && <CommentList comments={comments} />}
//         <Comment
//           avatar={
//             <Avatar
//               src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
//               alt="Han Solo"
//             />
//           }
//           content={
//             <Editor
//               onChange={this.handleChange}
//               onSubmit={this.handleSubmit}
//               submitting={submitting}
//               value={value}
//             />
//           }
//         />
//       </div>
//     );
//   }
// }



import { Comment, Icon, Tooltip, Avatar } from 'antd';
import moment from 'moment';

class CommentPanel extends React.Component {
  state = {
    likes: 0,
    dislikes: 0,
    action: null,
  };

  like = () => {
    this.setState({
      likes: 1,
      dislikes: 0,
      action: 'liked',
    });
  };

  dislike = () => {
    this.setState({
      likes: 0,
      dislikes: 1,
      action: 'disliked',
    });
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

    return (
      <Comment
        actions={actions}
        author={<a>Han Solo</a>}
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={
          <p>
            We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure), to help people create their product prototypes beautifully
            and efficiently.
          </p>
        }
        datetime={
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
    );
  }
}

export default CommentPanel