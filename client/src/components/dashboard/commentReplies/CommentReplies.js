import React, { Fragment, useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";


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
// CONDITIONALY SET DATA!!!!!!!!!
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
    setReplies(parseResponse.replies)
    setComment(parseResponse.comment[0])
    setUserNames(parseResponse.userNames)
    if(parseResponse){
      getComments()
    }
    setReply('')
  } catch (err) {
    console.error(err.message);
  }
};





  return (
    <Fragment>
      <h1>{comment.comment}</h1>
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
              <td className="font-weight-bold">{post.first_name}: {post.reply}</td>
              <td>
            {  user_account.user_id === post.user_id &&
                <button className="btn btn-danger" >
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
