import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

//components
import UserInfo from './userInfo/UserInfo'
import FriendRequest from './userInfo/friends/FriendRequest'
import MyFriends from './userInfo/friends/MyFriends'
import ImgFeedInput from './pictureUploads/ImgFeedInput'
import PersonalImg from './userInfo/PersonalImg'

import { ThemeProvider } from 'styled-components';
import { useOnClickOutside } from '../../hooks';
import { GlobalStyles } from '../../global';
import { theme, lightTheme } from '../../theme';
import { Burger, Menu } from './burgerMenu';
import FocusLock from 'react-focus-lock';

const Dashboard = ({ setAuth, logout, currentTheme, toggleTheme }) => {
  const [individualUser, setIndividualUser] = useState({})
  const [userInfo, setUserInfo] = useState([]);
  const [friendRequest, setFriendRequest] = useState([])
  const [friendsList, setFriendsList] = useState([])
  const [commentCount, setCommentCount] = useState([])

  const [uploadNewImg, setUploadNewImg] = useState(false);
  const [friendActivity, setFriendActivity] = useState(false)
  const [avatarImg, setAvatarImg] = useState('')

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

// put in arguments and keep track when changes are done to fire again

  useEffect(() => {
    getProfile();
    setUploadNewImg(false);
  }, [uploadNewImg]);
  useEffect(() => {
    getProfile();
    setFriendActivity(false);
  }, [friendActivity]);
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

  // const [currentTheme, setTheme] = useState('dark');
  // const toggleTheme = () => {
  //   if (currentTheme === 'dark') {
  //     setTheme('light');
  //   } else {
  //     setTheme('dark');
  //   }
  // }

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
        <div style={{marginBottom: '1%'}}>
          <Link to='/dashboard' style={{   textDecoration: 'none' }}>
            <h1 style={h1} onMouseEnter={changeBackground}
            onMouseLeave={changeBackgroundOut}>Flip - Flop: Home</h1>
          </Link>
            <button style={toggleStyle} onClick={toggleTheme}>{currentTheme === 'dark' ? 'LIGHT ☀️' : '🌚 DARK'}</button>
        </div>

      </headers>
      <div style={topChildContainer}>
        <div style={{ boxShadow: 'rgba(128, 128, 128, 0.45) 3px 3px 7px 9px', display: 'flex',flexDirection: 'row',
        flexWrap: 'nowrap', }}>
            <UserInfo userInfo={userInfo} individualUser={individualUser} />
            <ImgFeedInput setUploadNewImg={setUploadNewImg} />
        </div>
      </div>
        <PersonalImg userInfo={userInfo} logout={logout}/>
      <div style={{textAlign: 'center'}}>
        <p>&copy; MAURICO ACOSTA</p>
      </div>
    </div>
    </ThemeProvider>
  );
};
const header ={
  display: 'flex',
  justifyContent: 'center',
  borderBottom: '3px solid rgb(249, 167, 196)',
  // height: '127px',
}
const parentContainer = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  justifyContent: 'center',
  paddingBottom: '3%',
  margin: '1.5%',
  padding: '0 .5rem'

};
const topChildContainer = {
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'center',
  padding: '2%',
  flexWrap: 'wrap'
};
const h1 = {
  fontSize: '3rem',
  textAlign: 'center',
  fontFamily: 'Anton , sans-serif',
  marginTop: '7%'
};
const toggleStyle = {
  borderRadius: '15px',
    boxShadow: 'rgba(128, 128, 128, 0.45) 1px 2px 2px 2px',
    fontFamily: 'Balsamiq Sans, cursive',
    fontWeight: '900',
};

export default Dashboard;
