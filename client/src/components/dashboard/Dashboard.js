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
import { theme } from '../../theme';
import { Burger, Menu } from './burgerMenu';
import FocusLock from 'react-focus-lock';

const Dashboard = ({ setAuth, logout }) => {
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

  return (
    <ThemeProvider theme={theme}>
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
            <h1 style={h1} className='text-white' onMouseEnter={changeBackground}
            onMouseLeave={changeBackgroundOut}>Flip - Flop: Home</h1>
          </Link>
        </div>
      </headers>
      <div style={topChildContainer}>
        <div style={{ boxShadow: 'rgba(128, 128, 128, 0.45) 3px 3px 7px 9px', display: 'flex' }}>
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
  height: '127px',
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
}
const h1 = {
  fontSize: '3rem',
  textAlign: 'center',
  fontFamily: 'Anton , sans-serif',
  marginTop: '7%'
}

export default Dashboard;
