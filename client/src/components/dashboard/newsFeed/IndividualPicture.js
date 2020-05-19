import React, { Fragment, useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import FollowButton from './FollowButton'

const IndividualPicture = ({ setAuth }) => {

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
console.log('USER account', user_account);
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
    {userNames.length !== 0 &&
      userNames[0].user_id !== null &&
      userNames.map(e => (
        e.user_id === individualPicture.id_of_img_poster &&
          <div style={userInfoContainer}>
          <Link style={{ display: 'flex' }} to={`/friend/${e.user_id}`}>
            <img style={avatar}key={e.user_id} src={e.profile_img} />
            <h1 key={e.user_id} style={h1} className='text-white'>{e.first_name}</h1>
          </Link>

          </div>
      ))}
      <div className='text-center'>
        <img src={individualPicture.img ? individualPicture.img : '#'} key={individualPicture.img_post_id ? individualPicture.img : ''} alt='user posted picture' className='img-thumbnail rounded' style={{width: '70%'}}/>
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

      <FollowButton individualPicture={individualPicture}/>

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
                <Link className="btn btn-warning" to={`/commentReply/${post.comments_id}`} >REPLY</Link>
              }
              </td>
              <td>
            {  user_account.user_id === post.commenter_user_id &&
                <button className="btn btn-danger" onClick={() => deleteComment(post.comments_id)} >
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
  backgroundColor: '#fbcbd4',
    margin: '0 auto',
    padding: '0 2rem'
};
const userInfoContainer = {
  display: 'flex',
  flexDirection: 'row',
    overflow: 'auto',
    justifyContent: 'center'
}
const avatar = {
    width: '50px',
    height: '50px',
    borderRadius:' 50%',
    objectFit: 'cover',
    objectFosition: 'center right',
    boxShadow: 'rgba(128, 128, 128, 0.45) 5px 3px 11px 6px',
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    margin: '.5rem'
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
const commentHeartCountStyle = {
  color: 'white',
  fontSize: '2rem'
}
const commentContainer = {
  display: 'flex',
  flexDirection: 'column',
    overflow: 'auto',
    justifyContent: 'center'
}


export default IndividualPicture;
