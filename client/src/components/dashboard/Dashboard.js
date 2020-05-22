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
    <div>
      <h1 style={h1} className='text-white'>Flip - Flop</h1>
    </div>
    <div ref={node}>
          <FocusLock disabled={!open}>
            <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
            <Menu open={open} setOpen={setOpen} id={menuId} setAuth={setAuth} />
          </FocusLock>
        </div>
      <div className="">
        <div className="">
          <UserInfo userInfo={userInfo} individualUser={individualUser} />
        </div>
      </div>
      <div className="">
        <ImgFeedInput setUploadNewImg={setUploadNewImg} />
      </div>
      <div className="">
        <PersonalImg userInfo={userInfo} logout={logout}/>
      </div>
    </div>
    </ThemeProvider>
  );
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
}

export default Dashboard;
