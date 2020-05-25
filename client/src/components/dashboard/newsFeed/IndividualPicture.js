import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";
import FollowButton from './FollowButton';

import { ThemeProvider } from 'styled-components';
import { useOnClickOutside } from '../../../hooks';
import { GlobalStyles } from '../../../global';
import { theme, lightTheme } from '../../../theme';
import { Burger, Menu } from '../burgerMenu';
import FocusLock from 'react-focus-lock';

const IndividualPicture = ({ setAuth, currentTheme, toggleTheme  }) => {

  const [pictureId, setPictureId] = useState('')
  const [individualPicture, setIndividualPicture] = useState([]);
  const [individualPictureInfo, setIndividualPictureInfo] = useState([])
  const [userNames, setUserNames] = useState([]);
  const [commentCount, setCommentCount]= useState([])
  const [comment, setComment] = useState("");
  const [user_account, setUser_account] = useState([])

  let location = useLocation();
  let path = location.pathname;

  // ACTS LIKE COMPONENTDIDMOUTN BECOUASE OF BRACKETS AS SECOND PARAMATER
  useEffect(() => {
    let id;
    for(let i = path.length - 1; i > 0; i--){
      if(path[i] == '/'){
        id = path.slice(i+1)
        break;
      }
    }
    setPictureId(id);
      }, [])

  const getIndividualPictureInfo = async () => {
    try {

      const res = await fetch(`/dashboard/individualPicture/${pictureId}`, {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });
// CONDITIONALY SET DATA!!!!!!!!!
      const parseData = await res.json();

      if(parseData.individualPicture.length >= 1){
        setIndividualPictureInfo(parseData.individualPicture)
        setIndividualPicture(parseData.individualPicture[0])
      } else {
        setIndividualPictureInfo(parseData.backUpIndividualPicture)
        setIndividualPicture(parseData.backUpIndividualPicture[0])
      }
      setUser_account(parseData.user_account[0])
      setUserNames(parseData.userNames)
      setCommentCount(parseData.commentCount)

    } catch (err) {
        console.error(err.message);
    }
  }
  useEffect(() =>{
    getIndividualPictureInfo()
  },[pictureId])
// =============================
// POSTING A COMMENT
// =============================
const onSubmitForm = async e => {
  e.preventDefault();
  try {
    const myHeaders = new Headers();

    // I want to ad more than one header in post so I can send the Token
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("jwt_token", localStorage.token);

    // const body = { comment };
    const response = await fetch("/dashboard/comment", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        'comment': comment,
        'pictureId': pictureId
      })
    });

    const parseResponse = await response.json();

    if(parseResponse){
      getIndividualPictureInfo()
    }
    setComment('')
  } catch (err) {
    console.error(err.message);
  }
};

const addHeart = async (e) => {
  e.preventDefault();
  try {
    const myHeaders = new Headers();
    // I want to ad more than one header in post so I can send the Token
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("jwt_token", localStorage.token);

    const img_post_id = individualPicture.img_post_id;
    const response = await fetch("/dashboard/addHeart", {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify({
        'img_post_id': img_post_id
      })
    });

    const parseResponse = await response.json();
    if(parseResponse){
      getIndividualPictureInfo()
    }
  } catch (err) {
    console.error(err.message);
  }
}

const deleteComment= async (id) => {
  try {
    const response = await fetch(`/dashboard/deleteComment/${id}`, {
      method: "DELETE",
      headers: { jwt_token: localStorage.token }
    });

    const parseResponse = await response.json();
    console.log(parseResponse);
    if(parseResponse){
      getIndividualPictureInfo()
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
    <GlobalStyles />
    <div>
    <headers style={header}>
      <div ref={node}>
        <FocusLock disabled={!open}>
          <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
          <Menu open={open} setOpen={setOpen} id={menuId} setAuth={setAuth} />
        </FocusLock>
      </div>
      <div >
        <Link to='/dashboard' style={{   textDecoration: 'none' }}>
          <h1 style={h1} onMouseEnter={changeBackground}
          onMouseLeave={changeBackgroundOut}>Flip - Flop</h1>
        </Link>
        <button style={toggleStyle} onClick={toggleTheme}>{currentTheme === 'dark' ? 'LIGHT ☀️' : '🌚 DARK'}</button>
      </div>
    </headers>
    </div>
    {userNames.length !== 0 &&
      userNames[0].user_id !== null &&
      userNames.map(e => (
        e.user_id === individualPicture.id_of_img_poster &&
          <div style={userInfoContainer}>
          <Link style={{ display: 'flex', alignItems: 'center' }} to={`/friend/${e.user_id}`}>
            <img style={avatar}key={e.user_id} src={e.profile_img} />
            <h2 key={e.user_id} style={h2}>{e.first_name}</h2>
          </Link>
          <FollowButton individualPicture={individualPicture}/>

          </div>
      ))}
      <div className='text-center'>
        <img
          src={individualPicture.img ? individualPicture.img : '#'}
          key={individualPicture.img_post_id ? individualPicture.img : ''}
          alt='user posted picture'
          className='img-thumbnail rounded'
          style={{width: '70%', boxShadow: 'rgba(128, 128, 128, 0.45) 5px 3px 0px 4px'}}
        />
        <div className='mt-1'>
          <a href='#' onClick={addHeart} style={commentHeartCountStyle}>{individualPicture.img_likes  ? individualPicture.img_likes : 0}❤️</a>
          {
            commentCount.map(e => (
              e.img_commented_on_id === individualPicture.img_post_id &&
              <span key={individualPicture.img_post_id} style={commentHeartCountStyle}>{ e.count }💬</span>
            ))
          }
          <h1>{individualPicture.description}</h1>
        </div>
      </div>

      <div style={commentContainer}>
      <form className="d-flex" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="Comment"
          className="form-control"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <button className="btn btn-success ">Add</button>
      </form>
      <table className="table table-dark">
      <tbody>
        {individualPictureInfo .length !== 0 &&
          individualPictureInfo.map(post => (
            <tr key={post.comments_id}>
              <td className="font-weight-bold">{post.first_name}: {post.comment}</td>
              <td>
              {
                post.first_name &&
                <Link style={replyDelete} className="btn btn-warning" to={`/commentReply/${post.comments_id}`} >REPLY</Link>
              }
              </td>
              <td>
            {  user_account.user_id === post.commenter_user_id &&
                <button style={replyDelete} className="btn btn-danger" onClick={() => deleteComment(post.comments_id)} >
                  DELETE
                </button>
            }
              </td>
            </tr>
          ))}
      </tbody>
      </table>
      </div>
      <div style={{textAlign: 'center'}}>
          <p>&copy; MAURICO ACOSTA</p>
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
  height: '150px'
}
const parentContainer = {
  margin: '0 auto',
  padding: '0 2rem'
};
const userInfoContainer = {
  display: 'flex',
  flexDirection: 'row',
  // overflow: 'auto',
  justifyContent: 'center',
  marginTop: '1rem',
  marginBottom: '1rem'
}
const avatar = {
  width: '50px',
  height: '50px',
  borderRadius:' 50%',
  objectFit: 'cover',
  objectFosition: 'center right',
  boxShadow: 'rgba(128, 128, 128, 0.45) 1px 1px 8px 3px',
  justifyContent: 'center',
  alignItems: 'center',
  border: '2px solid rgb(249, 167, 196)'
};
const buttons = {
  border: '3px solid black',
  boxShadow: 'rgba(128, 128, 128, 0.45) 3px 3px 7px 2px',
  margin: '1%'
};
const h1 = {
  fontSize: '3rem',
  textAlign: 'center',
  fontFamily: 'Anton , sans-serif',
  marginTop: '15%'
};
const h2 = {
  fontSize: '3rem',
  textAlign: 'center',
  fontFamily: "Balsamiq Sans, cursive",
  marginLeft: '2%'
};
const commentHeartCountStyle = {
  fontSize: '2rem'
};
const commentContainer = {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  justifyContent: 'center'
};
const replyDelete = {
  border: '3px solid black',
  boxShadow: 'rgba(128, 128, 128, 0.45) 1px 2px 2px 2px',
  fontFamily: 'Balsamiq Sans, cursive',
  fontWeight: '900',
  borderRadius: '15px',
};
const toggleStyle = {
  borderRadius: '15px',
    boxShadow: 'rgba(128, 128, 128, 0.45) 1px 2px 2px 2px',
    fontFamily: 'Balsamiq Sans, cursive',
    fontWeight: '900',
};


export default IndividualPicture;
