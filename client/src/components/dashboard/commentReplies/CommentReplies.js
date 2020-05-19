import React, { Fragment, useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";


const CommentReplies = ({ setAuth }) => {
  const [reply, setReply] = useState('')
  const [commentRepliedToId, setCommentRepliedToId] = useState('')
  const [comment, setComment] = useState([])
  const [replies, setReplies] = useState([])
  const [userName, setUserNames] = useState([])
  const [fullReplyInfo, setFullReplyInfo] = useState([])
  const [user_account, setUser_account] = useState([])


  let location = useLocation();
  let path = location.pathname;
  useEffect(() => {
    let id;
    for(let i = path.length - 1; i > 0; i--){
      if(path[i] == '/'){
        id = path.slice(i+1)
        break;
      }
    }
    setCommentRepliedToId(id);
      }, [])


  const getComments = async () => {
    try {

      const res = await fetch(`/dashboard/replies/${commentRepliedToId}`, {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });
      const parseData = await res.json();

      setComment(parseData.comment[0])
      setReplies(parseData.replies)
      setUserNames(parseData.userNames)
      setFullReplyInfo(parseData.fullReplyInfo)
      setUser_account(parseData.user_account[0])

    } catch (err) {
        console.error(err.message);
    }
  }
useEffect(() =>{
  getComments()
},[commentRepliedToId])

// =============================
// POSTING A REPLY
// =============================
const onSubmitForm = async e => {
  e.preventDefault();
  try {
    const myHeaders = new Headers();
    // I want to ad more than one header in post so I can send the Token
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("jwt_token", localStorage.token);
    // const body = { reply, commentRepliedToId };
    const response = await fetch("/dashboard/commentReply", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        'reply': reply,
        'img_replied_to_id': comment.img_commented_on_id,
        'comment_replied_to_id': comment.comments_id
      })
    });

    const parseResponse = await response.json();

    if(parseResponse){
      getComments()
    }
    setReply('')
  } catch (err) {
    console.error(err.message);
  }
};
// =============
// DELETE REPLY
// =============
const deleteComment= async (id) => {
  try {
    const response = await fetch(`/dashboard/deleteReply/${id}`, {
      method: "DELETE",
      headers: { jwt_token: localStorage.token }
    });

    const parseResponse = await response.json();
    if(parseResponse){
      getComments()
    }
  } catch (err) {
    console.error(err.message);
  }
}

const changeBackground = (e) => {
  e.target.style.transform = 'scale(1.1)';
}
const changeBackgroundOut = (e) => {
  e.target.style.transform = ''
}
const logout = async e => {
  e.preventDefault();
  try {
    localStorage.removeItem("token");
    setAuth(false);
  } catch (err) {
    console.error(err.message);
  }
};
console.log('COMMENT',comment);
console.log('USERNAME', userName);
  return (
    <Fragment>
    <div style={parentContainer}>
      <div>
        <header style={{ textAlign: 'center', marginBottom: '6%', borderBottom: '2px solid gray' }}>
          <div>
            <h1 style={h1} className='text-white'>Flip - Flop</h1>
            <h1 style={h1} className="text-white">NEWS FEED</h1>
          </div>
          <Link to='/dashboard' className="btn btn-warning btn-lg" to='/' style={buttons} onMouseEnter={changeBackground}
          onMouseLeave={changeBackgroundOut}>HOME</Link>
          <Link to={`/dashboard/newsfeed/${user_account.user_id}`} className="btn btn-warning btn-lg" style={buttons} onMouseEnter={changeBackground}
          onMouseLeave={changeBackgroundOut}>FEED</Link>
          <Link to={`/dashboard`} className="btn btn-warning btn-lg" style={buttons} onMouseEnter={changeBackground}
          onMouseLeave={changeBackgroundOut}>FRIENDS</Link>
          <Link to={`/editprofile`} className="btn btn-warning btn-lg" style={buttons} onMouseEnter={changeBackground}
          onMouseLeave={changeBackgroundOut}>EDIT PROFILE</Link>
          <button onClick={e => logout(e)} className="btn btn-warning btn-lg" style={buttons} onMouseEnter={changeBackground}
          onMouseLeave={changeBackgroundOut}>LOG OUT</button>
        </header>
      </div>
      {
        userName.map(name => (
          name.user_id === comment.commenter_user_id &&
          <div>
            <h1 style={h1}>{name.first_name}</h1>
            <h1 style={h1}>{comment.comment}</h1>
          </div>
        ))
      }

      <div style={commentContainer}>
      <form className="d-flex" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="Comment"
          className="form-control"
          value={reply}
          onChange={e => setReply(e.target.value)}
        />
        <button className="btn btn-success ">REPLY</button>
      </form>
      <table className="table table-dark">
      <tbody>
        {fullReplyInfo .length !== 0 &&
          fullReplyInfo.map(post => (
            <tr key={post.comments_id}>
              <td className="font-weight-bold" key={post.comments_id}>{post.first_name}: {post.reply}</td>
              <td>
            {  user_account.user_id === post.user_id &&
                <button key={post.comments_id} className="btn btn-danger" onClick={() => deleteComment(post.comment_reply_id)} >
                  DELETE
                </button>
            }
              </td>
            </tr>
          ))}
      </tbody>
      </table>
      </div>
      </div>
    </Fragment>
  )
};
const parentContainer = {
  backgroundColor: 'rgb(251, 203, 212)',
  margin: '0px auto',
  padding:' 0px 2rem',
  height: '780px'
};
const buttons = {
  border: '3px solid black',
  boxShadow: 'rgba(128, 128, 128, 0.45) 3px 3px 7px 2px',
  margin: '1%'
};
const h1 = {
  fontSize: '3rem',
  textAlign: 'center',
  fontFamily: '-webkit-pictograph',
  borderRadius: '4%'
};
const commentContainer = {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  justifyContent: 'center',
  height: '500px'
};
export default CommentReplies;
