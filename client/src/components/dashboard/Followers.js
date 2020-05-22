import React, {useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'


import { ThemeProvider } from 'styled-components';
import { useOnClickOutside } from '../../hooks';
import { GlobalStyles } from '../../global';
import { theme } from '../../theme';
import { Burger, Menu } from './burgerMenu';
import FocusLock from 'react-focus-lock';

const Followers = ({ logout, setAuth }) =>{
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
      // console.log('FOLLOWER', parseData);
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
    <ThemeProvider theme={theme}>
    <div style={parentContainer}>
    <GlobalStyles />
      <div>
      <div>
        <h1 style={h1} className='text-white'>Flip - Flop</h1>
      </div>
      <div ref={node}>
            <FocusLock disabled={!open}>
              <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
              <Menu open={open} setOpen={setOpen} id={menuId} setAuth={setAuth} />
            </FocusLock>
      </div>
        <div style={followingContainer}>
          <div style={followingSubContainer}>
            <h2 style={{ fontSize: '1.5rem' }}>FOLLOWING</h2>

            {
              whoImFollowing.map(e => (
                 e.profile_img
                  ? <span>
                      <h2 style={{ fontSize: '1.5rem' }}>{e.first_name}</h2>
                      <Link to={`/friend/${e.user_id}`}>
                        <img
                          src={e.profile_img} alt='User Profile' style={avatar}
                          onMouseEnter={changeBackground}
                          onMouseLeave={changeBackgroundOut}
                        />
                      </Link>
                    </span>
                  : <span>
                      <h2 style={{ fontSize: '1.5rem' }}>{e.first_name}</h2>
                      <Link to={`/friend/${e.user_id}`}>
                        <img
                          src='https://via.placeholder.com/150' alt='User Profile' style={avatar}
                          onMouseEnter={changeBackground}
                          onMouseLeave={changeBackgroundOut}
                        />
                      </Link>
                    </span>
              ))
            }
          </div>
          <div style={followingSubContainer}>
            <h2 style={{ fontSize: '1.5rem' }}>FOLLOWERS</h2>
            {
              myFollowers.map(e => (
                e.profile_img
                 ? <span>
                     <h2 style={{ fontSize: '1.5rem' }}>{e.first_name}</h2>
                     <Link to={`/friend/${e.user_id}`}>
                       <img
                         src={e.profile_img} alt='User Profile' style={avatar}
                         onMouseEnter={changeBackground}
                         onMouseLeave={changeBackgroundOut}
                       />
                     </Link>
                   </span>
                 : <span>
                     <h2 style={{ fontSize: '1.5rem' }}>{e.first_name}</h2>
                     <Link to={`/friend/${e.user_id}`}>
                       <img
                         src='https://via.placeholder.com/150' alt='User Profile' style={avatar}
                         onMouseEnter={changeBackground}
                         onMouseLeave={changeBackgroundOut}
                       />
                     </Link>
                   </span>
              ))
            }
          </div>
        </div>
      </div>

    </div>
    </ThemeProvider>
  )
};
const followingContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'center',
  backgroundColor: '#fbcbd4',
  paddingBottom: '3%',
  marginTop: '3%'
};
const followingSubContainer = {
  borderRadius: '4%',
  backgroundColor: '#fbc107',
  border: '3px solid black',
  boxShadow: 'rgba(128, 128, 128, 0.45) 3px 3px 7px 8px',
  margin: '1%',
  padding: '2%',
  height: '938px',
  overflow: 'scroll',
  textAlign: 'center'
};
const parentContainer = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  border: '1px solid purple',
  justifyContent: 'center',
  backgroundColor: '#fbcbd4',
  paddingBottom: '3%'
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
  width: '147px',
    height: '147px',
  borderRadius:' 50%',
  objectFit: 'cover',
  objectFosition: 'center right',
  boxShadow: 'rgba(128, 128, 128, 0.45) 5px 3px 11px 6px'
};

export default Followers;
