import React, { Fragment, useEffect, useState, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";


import { ThemeProvider } from 'styled-components';
import { useOnClickOutside } from '../../../hooks';
import { GlobalStyles } from '../../../global';
import { theme, lightTheme } from '../../../theme';
import { Burger, Menu } from '../burgerMenu';
import FocusLock from 'react-focus-lock';


const CommentReplies = ({ setAuth, currentTheme, toggleTheme  }) => {
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

  //FOR BURGER
  const [open, setOpen] = useState(false);
  const node = useRef();
  const menuId = "main-menu";
  useOnClickOutside(node, () => setOpen(false));

  return (
    <ThemeProvider theme={currentTheme === 'dark' ? theme : lightTheme}>
    <Fragment>
    <div style={parentContainer}>
      <div>
      <GlobalStyles />
      <headers style={header}>
        <div ref={node}>
              <FocusLock disabled={!open}>
                <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
                <Menu open={open} setOpen={setOpen} id={menuId} setAuth={setAuth} />
              </FocusLock>
        </div>
        <div style={{marginBottom: '1%'}}>
          <Link to='/dashboard'>
            <h1 style={h1} onMouseEnter={changeBackground}
            onMouseLeave={changeBackgroundOut}>Flip - Flop: Home</h1>
          </Link>
          <button style={toggleStyle} onClick={toggleTheme}>{currentTheme === 'dark' ? 'LIGHT ☀️' : '🌚 DARK'}</button>
        </div>
      </headers>
      </div>
      <div style={originalCommentContainer}>
      {
        userName.map(name => (
          name.user_id === comment.commenter_user_id &&
          <div>
            <h2 style={h2}>{name.first_name}:</h2>
            <h2 style={h2}>{comment.comment}</h2>
          </div>
        ))
      }
      </div>

      <div style={commentContainer}>
      <form className="d-flex" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="Comment"
          className="form-control"
          value={reply}
          onChange={e => setReply(e.target.value)}
        />
        <button className="btn btn-success" style={{fontFamily: 'Balsamiq Sans, cursive',}}>REPLY</button>
      </form>
      <table className="table table-dark">
      <tbody>
        {fullReplyInfo .length !== 0 &&
          fullReplyInfo.map(post => (
            <tr key={post.comments_id}>
              <td className="font-weight-bold" key={post.comments_id} style={{fontFamily: 'Balsamiq Sans, cursive',}}>{post.first_name}: {post.reply}</td>
              <td>
            {  user_account.user_id === post.user_id &&
                <button key={post.comments_id} className="btn btn-danger" style={buttons} onClick={() => deleteComment(post.comment_reply_id)} >
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
    </ThemeProvider>
  )
};
const header ={
  display: 'flex',
  justifyContent: 'center',
  borderBottom: '3px solid rgb(249, 167, 196)',
  // height: '127px',
}
const parentContainer = {
  // backgroundColor: 'rgb(251, 203, 212)',
  margin: '0px auto',
  padding:' 0px 2rem',
  // height: '780px'
};
const buttons = {
  textDecoration: 'none',
  border: '3px solid black',
  boxShadow: 'rgba(128, 128, 128, 0.45) 1px 2px 2px 2px',
  fontFamily: 'Balsamiq Sans, cursive',
  fontWeight: '900',
  borderRadius: '15px',
};
const h1 = {
  fontSize: '3rem',
  textAlign: 'center',
  fontFamily: 'Anton , sans-serif',
  borderRadius: '4%',
  marginTop: '15%'
};
const h2 = {
  fontFamily: 'Balsamiq Sans, cursive',
  fontSize: '3rem',
  textAlign: 'center',
  borderRadius: '4%'
}
const originalCommentContainer = {
  border: '3px solid black',
    width: '60%',
    marginLeft: '20%',
    padding: '1%',
    backgroundColor: 'rgb(244, 186, 0)',
    boxShadow: 'rgba(128, 128, 128, 0.45) 3px 3px 7px 2px',
    borderRadius: '2%',
    marginTop: '3%',
};
const commentContainer = {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  justifyContent: 'center',
  height: '500px'
};
const toggleStyle = {
  borderRadius: '15px',
    boxShadow: 'rgba(128, 128, 128, 0.45) 1px 2px 2px 2px',
    fontFamily: 'Balsamiq Sans, cursive',
    fontWeight: '900',
};

export default CommentReplies;
