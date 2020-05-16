import React, { Fragment, useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import FriendRequestButton from './FriendRequestButton'

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

    const body = { comment };
    const response = await fetch("/dashboard/comment", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(body)
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



  return (
    <Fragment>
    <Link className="btn btn-warning mt-5 ml-5 mb-5" to={`/dashboard/newsfeed/${user_account.user_id}`}>BACK</Link>
    <Link className='btn btn-warning  mt-5 ml-5 mb-5'  to='/dashboard'>PROFILE</Link>
    {userNames.length !== 0 &&
      userNames[0].user_id !== null &&
      userNames.map(e => (
        e.user_id === individualPicture.id_of_img_poster &&
          <h1 key={e.user_id} className='text-white'>Posted by: {e.first_name} -- {individualPicture.description}</h1>
      ))}
      <div className='text-center'>

        <img src={individualPicture.img ? individualPicture.img : '#'} key={individualPicture.img_post_id ? individualPicture.img : ''} alt='user posted picture' className='img-thumbnail rounded w-50'/>
        <div className='mt-1'>
          <a href='#' onClick={addHeart} className='text-white'>{individualPicture.img_likes  ? individualPicture.img_likes : 0}❤️</a>
          {
            commentCount.map(e => (
              e.img_commented_on_id === individualPicture.img_post_id &&
              <span key={individualPicture.img_post_id} className='text-white'>{ e.count }💬</span>
            ))
          }

        </div>
      </div>
      <h1 className="text-center my-5 text-white">Is this picture a flip 👍 or a flop 👎 </h1>

      <FriendRequestButton individualPicture={individualPicture}/>


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
    </Fragment>
  )
};


export default IndividualPicture;
