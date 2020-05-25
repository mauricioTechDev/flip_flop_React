import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';

import AvatarInput from '../pictureUploads/AvatarInput';
import AboutMeInput from '../userInfo/AboutMeInput';
import UserInfo from './UserInfo';
import Deleteaccount from './Deleteaccount'

import { ThemeProvider } from 'styled-components';
import { useOnClickOutside } from '../../../hooks';
import { GlobalStyles } from '../../../global';
import { theme, lightTheme } from '../../../theme';
import { Burger, Menu } from '../burgerMenu';
import FocusLock from 'react-focus-lock';

const Editprofile = ({ logout, setAuth, currentTheme, toggleTheme }) => {
  const [individualUser, setIndividualUser] = useState({})
  const [userInfo, setUserInfo] = useState([]);
  const [friendRequest, setFriendRequest] = useState([])
  const [friendsList, setFriendsList] = useState([])
  const [commentCount, setCommentCount] = useState([])

  const [avatarChange, setAvatarChange] = useState(false);

  useEffect(() => {
    getProfile()
  },[])
  useEffect(() => {
    getProfile()
  },[avatarChange])


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

  return(
    <ThemeProvider theme={currentTheme === 'dark' ? theme : lightTheme}>
    <div style={parentContainer}>
    <GlobalStyles />
    <div>
      <headers style={header}>
        <div ref={node}>
              <FocusLock disabled={!open}>
                <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
                <Menu open={open} setOpen={setOpen} id={menuId} setAuth={setAuth} />
              </FocusLock>
        </div>
        <div >
          <Link to='/dashboard' style={{   textDecoration: 'none' }}>
            <h1 style={h1}  onMouseEnter={changeBackground}
            onMouseLeave={changeBackgroundOut}>Flip - Flop: Home</h1>
          </Link>
          <button style={toggleStyle} onClick={toggleTheme}>{currentTheme === 'dark' ? 'LIGHT ☀️' : '🌚 DARK'}</button>
        </div>
      </headers>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2%' }}>
      <div style={{ boxShadow: 'rgba(128, 128, 128, 0.45) 3px 3px 7px 2px', border: '1px solid black', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
        <UserInfo userInfo={userInfo} individualUser={individualUser} />
        <AvatarInput  setAvatarChange={setAvatarChange} />
      </div>
    </div>
      <div style={editBox}>
        <AboutMeInput setAvatarChange={setAvatarChange} individualUser={individualUser} />
      </div>
      <div>
        <Deleteaccount logout={logout}/>
      </div>
    <div style={{textAlign: 'center', marginTop: '3%'}}>
        <p>&copy; MAURICO ACOSTA</p>
    </div>
    </div>
    </ThemeProvider>
  )
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
const header ={
  display: 'flex',
  justifyContent: 'center',
  borderBottom: '3px solid rgb(249, 167, 196)',
  height: '127px',
}
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
  borderRadius: '4%',
  fontFamily: 'Anton , sans-serif',
}
const editBox = {
  margin: 'auto',
  padding: '1%',
  // boxShadow: 'rgba(128, 128, 128, 0.45) 3px 3px 7px 9px',
};
const toggleStyle = {
  borderRadius: '15px',
    boxShadow: 'rgba(128, 128, 128, 0.45) 1px 2px 2px 2px',
    fontFamily: 'Balsamiq Sans, cursive',
    fontWeight: '900',
};

export default Editprofile;
