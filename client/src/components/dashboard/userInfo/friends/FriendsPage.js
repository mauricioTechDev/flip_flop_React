import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom'


const FriendsPage = () => {
  const [friend, setFriend] = useState([])
  const [friendsPicture, setFriendsPicture] = useState([])
  const [commentCount, seCommentCount] = useState([])
  const [friendsId, setFriendsId] = useState([])


  useEffect(() => {
    getFriendPage();
  }, [friendsId]);

  let location = useLocation();
  let path = location.pathname;

  useEffect(() => {
    let id;
    for(let i = path.length - 1; i > 0; i--){
      if(path[i] === '/'){
        id = path.slice(i+1)
        break;
      }
    }
    setFriendsId(id);
      }, [])


  const getFriendPage = async () => {
    try {
      const res = await fetch(`/dashboard/friend/${friendsId}`, {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();

      setFriend(parseData.friend)
      setFriendsPicture(parseData.friendsPicture);
      seCommentCount(parseData.commentCount)
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <Link className='btn btn-warning  mt-5 ml-5 mb-5'  to='/dashboard'>PROFILE</Link>
      <div className="d-flex justify-content-center">
        <h1 className='text-white mr-5'>Welcome to Flip - Flop </h1>
      </div>
      <div className="d-flex justify-content-center">
        <h2 className='text-white mr-5'>This is {friend.first_name}'s page</h2>
        <h2 className='text-white mr-5'>{friend.about_me}</h2>
      </div>
      <div className="d-flex justify-content-center">
        <h2 className='text-white mr-5'>{friend.about_me}</h2>
      </div>
      <div className="text-center">
        <img src={friend.profile_img} key={friend.user_id}className='img-thumbnail rounded' style={{ "width" : "10%"}} alt='user profile'/>
      </div>

      <div className="d-flex flex-wrap">
        <div className="p-2 flex-wrap mt-5">
          {friendsPicture.length !== 0 &&
            friendsPicture.map(e => (
                <Link to={`/individualPicture/${e.img_post_id}`} key={e.img_post_id} >
                  <img src={e.img} key={e.img_post_id} alt={e.description} className='img-thumbnail rounded '/>
                </Link>
            ))}
          </div>
        </div>
    </div>
  )
};


export default FriendsPage;
