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

      const res = await fetch(`http://localhost:5000/dashboard/replies/${commentRepliedToId}`, {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });
      const parseData = await res.json();
      console.log(parseData);
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
    const response = await fetch("http://localhost:5000/dashboard/commentReply", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        'reply': reply,
        'img_replied_to_id': comment.img_commented_on_id,
        'comment_replied_to_id': comment.comments_id
      })
    });

    const parseResponse = await response.json();

    console.log(parseResponse);
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
    const response = await fetch(`http://localhost:5000/dashboard/deleteReply/${id}`, {
      method: "DELETE",
      headers: { jwt_token: localStorage.token }
    });

    const parseResponse = await response.json();
    console.log(parseResponse);
    if(parseResponse){
      getComments()
    }
  } catch (err) {
    console.error(err.message);
  }
}





  return (
    <Fragment>
      <Link className="btn btn-warning mt-5 ml-5 mb-5" to={`/individualPicture/${comment.img_commented_on_id}`}>BACK</Link>
      <Link className='btn btn-warning  mt-5 ml-5 mb-5'  to='/dashboard'>PROFILE</Link>
      <h1 className='text-white'>{comment.comment}</h1>
      <form className="d-flex" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="Comment"
          className="form-control"
          value={reply}
          onChange={e => setReply(e.target.value)}
        />
        <button className="btn btn-success ">Add</button>
      </form>
      <table className="table table-dark">
      <tbody>


        {fullReplyInfo .length !== 0 &&
          fullReplyInfo.map(post => (
            <tr key={post.comments_id}>
              <td className="font-weight-bold" key={post.comments_id}>{post.first_name}: {post.reply}</td>
              <td>
            {  user_account.user_id === post.user_id &&
                <button className="btn btn-danger" onClick={() => deleteComment(post.comment_reply_id)} >
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

export default CommentReplies;
