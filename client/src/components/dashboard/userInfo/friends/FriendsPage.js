import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom'
import UnfollowButton from './UnfollowButton'
import FollowButtonTwo from './FollowButtonTwo'

const FriendsPage = ({ logout, userInfo }) => {
  const [friend, setFriend] = useState([])
  const [friendsPicture, setFriendsPicture] = useState([])
  const [commentCount, seCommentCount] = useState([])
  const [friendsId, setFriendsId] = useState([])
  const [currentUserId, setCurrentUserId] = useState('')
  const [unFollowed, setUnFollowed] = useState(false)
  const [followed, setFollowed] = useState(false)


// console.log('THe USER INFO', userInfo);
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
      setCurrentUserId(parseData.user_id)
    } catch (err) {
      console.error(err.message);
    }
  };

  // console.log('FRIEND', friend);
  const changeBackground = (e) => {
    e.target.style.transform = 'scale(1.1)';
  }
  const changeBackgroundOut = (e) => {
    e.target.style.transform = ''
  }

  return (
    <div style={parentContainer}>
    <div>
      <header style={{ textAlign: 'center', borderBottom: '2px solid gray' }}>
        <div>
          <h1 style={h1} className='text-white'>Flip - Flop</h1>
        </div>
        <Link to='/dashboard' className="btn btn-warning btn-lg" to='/' style={buttons} onMouseEnter={changeBackground}
        onMouseLeave={changeBackgroundOut}>HOME</Link>
        <Link to={`/dashboard/newsfeed/${currentUserId}`} className="btn btn-warning btn-lg" style={buttons} onMouseEnter={changeBackground}
        onMouseLeave={changeBackgroundOut}>FEED</Link>
        <Link to={`/followers/${currentUserId}`} className="btn btn-warning btn-lg" style={buttons} onMouseEnter={changeBackground}
        onMouseLeave={changeBackgroundOut}>FOLLOWERS</Link>
        <Link to={`/editprofile`} className="btn btn-warning btn-lg" style={buttons} onMouseEnter={changeBackground}
        onMouseLeave={changeBackgroundOut}>EDIT PROFILE</Link>
        <button onClick={e => logout(e)} className="btn btn-warning btn-lg" style={buttons} onMouseEnter={changeBackground}
        onMouseLeave={changeBackgroundOut}>LOG OUT</button>
      </header>
    </div>


    <div style={parentContainer}>
        <h1 style={h1} className='h1 text-white'> {friend.first_name} </h1>

        { friend.profile_img
          ? <span><img src={friend.profile_img} alt='User Profile' style={avatar}
          onMouseEnter={changeBackground}
          onMouseLeave={changeBackgroundOut}/></span>
          : <span><img src='https://via.placeholder.com/150' alt='User Profile' style={avatar}/></span>
        }
        <h2 style={h2} className='h2 text-white'>{ friend.about_me }</h2>

        <UnfollowButton friendsId={friendsId} setUnFollowed={setUnFollowed} followed={followed} setFollowed={setFollowed} />
        <FollowButtonTwo currentUserId={currentUserId} friendsId={friendsId} unFollowed={unFollowed} setFollowed={setFollowed} setUnFollowed={setUnFollowed}/>
    </div>




      <div style={gallary}>
          {friendsPicture.length !== 0 &&
            friendsPicture.map(e => (
              <div style={ galleryItem }>
                <Link to={`/individualPicture/${e.img_post_id}`} key={e.img_post_id} >
                  <img src={e.img} key={e.img_post_id} alt={e.description} style={ galleryImage } />
                </Link>
                </div>
            ))}
        </div>
    </div>
  )
};
const parentContainer = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  justifyContent: 'center',
  backgroundColor: '#fbcbd4',
  paddingBottom: '3%',
  textAlign: 'center'
};
const buttons = {
  border: '3px solid black',
  boxShadow: 'rgba(128, 128, 128, 0.45) 3px 3px 7px 2px',
  margin: '1%'
};
const h1 = {
  marginTop: '25px',
  fontSize: '3rem',
  textAlign: 'center',
  fontFamily: '-webkit-pictograph',
  borderRadius: '4%'
};

const avatar = {
  width: '200px',
  height: '200px',
  borderRadius:' 50%',
  margin: '20px',
  objectFit: 'cover',
  objectFosition: 'center right',
  boxShadow: 'rgba(128, 128, 128, 0.45) 5px 3px 11px 6px'
};

const h2 = {
  fontSize: '2rem',
  textAlign: 'center',
  marginLeft: '15%',
  marginRight: '16%',
  fontFamily: '-webkit-pictograph',
  borderRadius: '4%'
};
const gallary = {
  display: 'flex',
    flexWrap: 'wrap',
    margin: '-1rem -1rem',
    paddingBottom: '3rem',
    overflow: 'auto',
    paddingRight: '1rem',
    paddingLeft: '1rem'
};
const galleryItem = {
  position: 'relative',
    flex: '1 0 22rem',
    margin: '.5rem',
    color: '#fff',
    cursor: 'pointer'
};
const galleryImage = {
  width: '100%',
    height: '100%',
    objectFit: 'cover',
    boxShadow: 'rgba(128, 128, 128, 0.45) 5px 3px 11px 6px'
};

export default FriendsPage;
