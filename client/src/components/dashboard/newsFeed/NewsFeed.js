import React, { Fragment, useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";


const NewsFeed = ({ setAuth }) => {
  const [userId, setUserId] = useState('')
  const [newsFeed, setNewsFeed] = useState([]);
  const [commentCount, setCommentCount] = useState([]);


  let location = useLocation();
  let path = location.pathname;

  // ACTS LIKE COMPONENTDIDMOUTN BECOUASE OF BRACKETS AS SECOND PARAMATER
  useEffect(() => {
    let id;
    for(let i = path.length - 1; i > 0; i--){
      if(path[i] === '/'){
        id = path.slice(i+1)
        break;
      }
    }
    setUserId(id);
      }, [])

  const getNewsFeed = async () => {
    try {
      const res = await fetch(`http://localhost:5000/dashboard/newsfeed/${userId}`, {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      setNewsFeed(parseData.newsFeed)
      setCommentCount(parseData.commentCount)

    } catch (err) {
        console.error(err.message);
    }
  }

  useEffect(() =>{
    getNewsFeed()
  },[userId])

  return (
    <div>
      <div>
        <h1 className="text-center text-white">NEWS FEED</h1>
      </div>
      <Link to='/dashboard' className='btn btn-warning mt-5 ml-5'>PROFILE</Link>

      <div className="d-flex flex-wrap">
        <div className="p-2 flex-wrap mt-5">
          {newsFeed.length !== 0 &&
            newsFeed[0].img_post_id !== null &&
            newsFeed.map(e => (
              <Link to={`/individualPicture/${e.img_post_id}`} key={e.img_post_id}>
                <img src={e.img} key={e.img_post_id} alt='user posted picture' className='img-thumbnail rounded w-50'/>
              </Link>
            ))}
        </div>
      </div>


    </div>

  )
};

export default NewsFeed;
