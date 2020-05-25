import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom'

import { ThemeProvider } from 'styled-components';
import { useOnClickOutside } from '../../hooks';
import { GlobalStyles } from '../../global';
import { theme, lightTheme } from '../../theme';
import { Burger, Menu } from './burgerMenu';
import FocusLock from 'react-focus-lock';

const Followers = ({ logout, setAuth, toggleTheme, currentTheme }) =>{
  const [individualUser, setIndividualUser] = useState({})
  const [userInfo, setUserInfo] = useState([]);
  const [friendRequest, setFriendRequest] = useState([])
  const [friendsList, setFriendsList] = useState([])
  const [commentCount, setCommentCount] = useState([])

  const [allFollowers, setFollowers] = useState([])
  const [myFollowers, setMyFollowers] = useState([])
  const [whoImFollowing, setWhoImFollowing] = useState([])


  useEffect(() => {
    getProfile()
  }, [])
  const getProfile = async () => {
    try {
      const res = await fetch("/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      console.log('PARSE DATA', parseData);

      setIndividualUser(parseData.userInfo[0])
      setUserInfo(parseData.userInfo);
      setFriendRequest(parseData.friendRequest)
      setFriendsList(parseData.friendsList)
      setCommentCount(parseData.commentCount)
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getFollowers()
  }, [])
  const getFollowers = async () => {
    try {
      const res = await fetch("/dashboard/getFollowers", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      setFollowers(parseData.allFollowers)
      setMyFollowers(parseData.myFollowers)
      setWhoImFollowing(parseData.whoImFollowing)

    } catch (err) {
      console.error(err.message);
    }
  };



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
      <div style={{ marginBottom: '1%'}}>
      <Link to='/dashboard' style={{   textDecoration: 'none' }}>
        <h1 style={h1} onMouseEnter={changeBackground}
        onMouseLeave={changeBackgroundOut}>Flip - Flop: FOLLOWERS
          <img style={followerIcon} src='/images/followers.png' alt='followers'/>
        </h1>
      </Link>
      <button style={toggleStyle} onClick={toggleTheme}>{currentTheme === 'dark' ? 'LIGHT ☀️' : '🌚 DARK'}</button>
      </div>
      </headers>


        <div style={followingContainer}>
          <div style={followingSubContainer}>
            <h2 style={ following }>FOLLOWING</h2>
            <div style={gallary}>
                  {
                    whoImFollowing.map(e => (
                      e.profile_img
                      ? <div style={ galleryItem }>
                          <Link to={`/friend/${e.user_id}`} key={e.img_post_id}>
                            <span style={avatarName}>{e.first_name}</span>
                            <img src={e.profile_img} key={e.user_id} alt='User Profile' style={ galleryImage }onMouseEnter={changeBackground}
                            onMouseLeave={changeBackgroundOut} />
                          </Link>
                        </div>
                      : <div style={ galleryItem }>
                          <Link to={`/friend/${e.user_id}`} key={e.img_post_id}>
                            <span style={avatarName}>{e.first_name}</span>
                            <img src='https://via.placeholder.com/150' key={e.user_id} alt='User Profile' style={ galleryImage }onMouseEnter={changeBackground}
                            onMouseLeave={changeBackgroundOut} />
                          </Link>
                        </div>
                    ))}
              </div>
          </div>
          <div style={followingSubContainer}>
            <h2 style={ following }>FOLLOWERS</h2>
            <div style={gallary}>
                  {
                    myFollowers.map(e => (
                      e.profile_img
                      ? <div style={ galleryItem }>
                          <Link to={`/friend/${e.user_id}`} key={e.img_post_id}>
                            <span style={avatarName}>{e.first_name}</span>
                            <img src={e.profile_img} key={e.user_id} alt='User Profile' style={ galleryImage }onMouseEnter={changeBackground}
                            onMouseLeave={changeBackgroundOut} />
                          </Link>
                        </div>
                      : <div style={ galleryItem }>
                          <Link to={`/friend/${e.user_id}`} key={e.img_post_id}>
                            <span style={avatarName}>{e.first_name}</span>
                            <img src='https://via.placeholder.com/150' key={e.user_id} alt='User Profile' style={ galleryImage }onMouseEnter={changeBackground}
                            onMouseLeave={changeBackgroundOut} />
                          </Link>
                        </div>
                    ))}
              </div>
          </div>
        </div>
      <div style={{textAlign: 'center'}}>
          <p>&copy; MAURICO ACOSTA</p>
      </div>
    </div>
    </ThemeProvider>
  )
};
const followerIcon = {
  width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0.5rem',
    zIndex: '1',
    transform: 'scale(1.05)',
}
const organizeFollowers = {
  display: 'flex',
    flexWrap: 'wrap',
    paddingBottom: '3rem',
    overflow: 'auto',
    paddingRight: '9.5%',
    paddingLeft: '9.5%',
}
const parentContainer = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  justifyContent: 'center',
  paddingBottom: '3%',
  padding: '0 1rem',
  // marginTop: '2%'
};
const header ={
  display: 'flex',
  flexDirection: 'row',
  borderBottom: '2px solid purple',
  justifyContent: 'center',
  // height: '150px',
  borderBottom: '3px solid rgb(249, 167, 196)',
}
const following = {
  fontSize: '1.1rem',
  color: '#ffffff',
  background: 'rgba(0, 0, 0, 0.47)',
  borderRadius: '6%',
  width: '8.5rem',
  margin: 'auto',
  fontWeight: '900',

}
const followingContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'center',
  paddingBottom: '3%',
  marginTop: '3%'
};
const followingSubContainer = {
  borderRadius: '4%',
  backgroundColor: '#f88807',
  boxShadow: 'rgba(128, 128, 128, 0.45) 3px 3px 7px 8px',
  margin: '1%',
  padding: '2%',
  overflow: 'scroll',
  textAlign: 'center',
  width: '50%'
};

const h1 = {
  fontSize: '3rem',
  textAlign: 'center',
  fontFamily: 'Anton , sans-serif',
  marginTop: '8%'
};
const avatar = {
  width: '147px',
    height: '147px',
  borderRadius:' 50%',
  objectFit: 'cover',
  objectFosition: 'center right',
  boxShadow: 'rgba(128, 128, 128, 0.45) 5px 3px 11px 6px',
  border: '2px solid rgb(249, 167, 196)'
};
const gallary = {
  display: 'flex',
    flexWrap: 'wrap',
    // paddingBottom: '3rem',
    // overflow: 'auto',
    // paddingRight: '9.5%',
    // paddingLeft: '9.5%',
    justifyContent: 'center'
};
const galleryItem = {
    margin: '.5rem',
    color: '#fff',
    cursor: 'pointer'
};
const galleryImage = {
    height: '100%',
    objectFit: 'cover',
    boxShadow: 'rgba(128, 128, 128, 0.45) 5px 3px 2px 3px'
};
const avatarName = {
  textAlign: 'center',
    objectFit: 'cover',
    boxShadow: 'rgba(128, 128, 128, 0.45) 5px 3px 11px 6px',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    marginLeft: '.25rem',
    marginTop: '.25rem',
    background: '#00000078',
    padding: '.5%',
    borderRadius: '9%',
    fontFamily: 'Balsamiq Sans, cursive',
    color: '#ffffff',
    zIndex: '1'
};
const toggleStyle = {
  borderRadius: '15px',
    boxShadow: 'rgba(128, 128, 128, 0.45) 1px 2px 2px 2px',
    fontFamily: 'Balsamiq Sans, cursive',
    fontWeight: '900',
}

export default Followers;
