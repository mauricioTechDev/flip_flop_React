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
      if(path[i] == '/'){
        id = path.slice(i+1)
        break;
      }
    }
    setFriendsId(id);
      }, [])


  const getFriendPage = async () => {
    try {
      const res = await fetch(`http://localhost:5000/dashboard/friend/${friendsId}`, {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      console.log(parseData);

      setFriend(parseData.friend)
      setFriendsPicture(parseData.friendsPicture);
      seCommentCount(parseData.commentCount)
    } catch (err) {
      console.error(err.message);
    }
  };
  const avatarSize = {
    width: '40px',
    border: '5px solid pink'
  };

console.log('friends pics',friendsPicture);
  return (
    <div>
      <div className="d-flex justify-content-center">
        <h1 className='text-white mr-5'>Welcome to Flip - Flop </h1>

      </div>
      <div className="d-flex justify-content-center">
        <h2 className='text-white mr-5'>This is {friend.first_name}'s page</h2>
      </div>
      <div class="text-center">
        <img src={friend.profile_img} key={friend.user_id}className='img-thumbnail rounded' style={{ "width" : "10%"}}/>
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


      <div className="row">

      </div>
      <div className="row">

      </div>

      <div class="row">
      </div>
    </div>
  )
};


export default FriendsPage;
