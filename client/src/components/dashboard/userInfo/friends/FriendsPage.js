import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link, useLocation } from 'react-router-dom'
import UnfollowButton from './UnfollowButton'
import FollowButtonTwo from './FollowButtonTwo'

import { ThemeProvider } from 'styled-components';
import { useOnClickOutside } from '../../../../hooks';
import { GlobalStyles } from '../../../../global';
import { theme, lightTheme } from '../../../../theme';
import { Burger, Menu } from '../../burgerMenu';
import FocusLock from 'react-focus-lock';

const FriendsPage = ({ logout, userInfo, setAuth, currentTheme, toggleTheme }) => {
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
  //FOR BURGER
  const [open, setOpen] = useState(false);
  const node = useRef();
  const menuId = "main-menu";
  useOnClickOutside(node, () => setOpen(false));

  return (
    <ThemeProvider theme={currentTheme === 'dark' ? theme : lightTheme}>
    <div style={parentContainer}>
    <GlobalStyles />
    <headers style={header}>
      <div ref={node}>
            <FocusLock disabled={!open}>
              <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
              <Menu open={open} setOpen={setOpen} id={menuId} setAuth={setAuth} />
            </FocusLock>
      </div>
      <div >
        <Link to='/dashboard' style={{   textDecoration: 'none' }}>
          <h1 style={h1}onMouseEnter={changeBackground}
          onMouseLeave={changeBackgroundOut}>Flip - Flop</h1>
        </Link>
        <button style={toggleStyle} onClick={toggleTheme}>{currentTheme === 'dark' ? 'LIGHT ☀️' : '🌚 DARK'}</button>
      </div>
    </headers>
    <div style={userInfoContainer}>
        { friend.profile_img
          ? <span><img src={friend.profile_img} alt='User Profile' style={avatar}
          onMouseEnter={changeBackground}
          onMouseLeave={changeBackgroundOut}/></span>
          : <span><img src='https://via.placeholder.com/150' alt='User Profile' style={avatar}/></span>
        }
        <div style={{ alignSelf: 'center' }}>
          <h2 style={h2} className='h1'> {friend.first_name} </h2>
          <h3 style={h3} className='h2'>{ friend.about_me }</h3>
        </div>

        <UnfollowButton friendsId={friendsId} setUnFollowed={setUnFollowed} followed={followed} setFollowed={setFollowed} />
        <FollowButtonTwo currentUserId={currentUserId} friendsId={friendsId} unFollowed={unFollowed} setFollowed={setFollowed} setUnFollowed={setUnFollowed}/>
    </div>
      <div style={gallary}>
          {friendsPicture.length !== 0 &&
            friendsPicture.map(e => (
              <div style={ galleryItem }>
                <Link to={`/individualPicture/${e.img_post_id}`} key={e.img_post_id} >
                  <span style={avatarName}>{e.img_likes}❤️</span>
                  <img src={e.img} key={e.img_post_id} alt={e.description} style={ galleryImage } />
                </Link>
                </div>
            ))}
        </div>
        <div style={{textAlign: 'center'}}>
            <p>&copy; MAURICO ACOSTA</p>
        </div>
    </div>
    </ThemeProvider>
  )
};
const parentContainer = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0 2rem',
  marginTop: '2%'
};
const userInfoContainer ={
  // display: 'flex',
  // flexDirection: 'row',
  // justifyContent: 'center',
  // padding: '0 2rem',
  // marginTop: '2%',
  // alignItems: 'center'
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '2%'
}
const header ={
  display: 'flex',
  flexDirection: 'row',
  borderBottom: '2px solid purple',
  justifyContent: 'center',
  height: '150px',
  borderBottom: '3px solid rgb(249, 167, 196)',
}
const buttons = {
  border: '3px solid black',
  fontFamily: 'Balsamiq Sans, cursive',
  fontWeight: '900',
  borderRadius: '15px',
  boxShadow: 'rgba(128, 128, 128, 0.45) 1px 2px 2px 2px',
  margin: '8%'
};
const h1 = {
  marginTop: '25px',
  fontSize: '3rem',
  textAlign: 'center',
  borderRadius: '4%',
  fontFamily: 'Anton , sans-serif',
};

const avatar = {
  width: '200px',
  height: '200px',
  borderRadius:' 50%',
  margin: '20px',
  objectFit: 'cover',
  objectFosition: 'center right',
  boxShadow: 'rgba(128, 128, 128, 0.45) 5px 3px 11px 6px',
  border: '2px solid rgb(249, 167, 196)'
};

const h2 = {
  fontSize: '3rem',
  textAlign: 'center',
  // marginLeft: '15%',
  // marginRight: '16%',
  // borderRadius: '4%',
  fontFamily: 'Balsamiq Sans, cursive',
};
const h3 = {
  fontSize: '2rem',
  textAlign: 'center',
  marginLeft: '15%',
  marginRight: '16%',
  borderRadius: '4%',
  fontFamily: 'Balsamiq Sans, cursive',
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
const avatarName = {
  textAlign: 'center',
    objectFit: 'cover',
    boxShadow: 'rgba(128, 128, 128, 0.45) 5px 3px 11px 6px',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    marginLeft: '4rem',
    marginTop: '1rem',
    background: '#00000078',
    paddingTop: '1%',
    borderRadius: '9%',
    fontFamily: 'Balsamiq Sans, cursive',
    color: '#f9a7c4',
    zIndex: '1',
    width: '14%'
};
const toggleStyle = {
  borderRadius: '15px',
    boxShadow: 'rgba(128, 128, 128, 0.45) 1px 2px 2px 2px',
    fontFamily: 'Balsamiq Sans, cursive',
    fontWeight: '900',
};

export default FriendsPage;
