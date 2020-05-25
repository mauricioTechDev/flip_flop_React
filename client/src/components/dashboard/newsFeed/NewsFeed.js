import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";

import { ThemeProvider } from 'styled-components';
import { useOnClickOutside } from '../../../hooks';
import { GlobalStyles } from '../../../global';
import { theme, lightTheme } from '../../../theme';
import { Burger, Menu } from '../burgerMenu';
import FocusLock from 'react-focus-lock';


const NewsFeed = ({ setAuth, logout, currentTheme, toggleTheme  }) => {
  const [userId, setUserId] = useState('')
  const [newsFeed, setNewsFeed] = useState([]);
  const [commentCount, setCommentCount] = useState([]);


  let location = useLocation();
  let path = location.pathname;

  // ACTS LIKE COMPONENTDIDMOUTN BECOUASE OF BRACKETS AS SECOND PARAMATER
  useEffect(() => {
    let id;
    for(let i = path.length - 1; i > 0; i--){
      if(path[i] === '/'){
        id = path.slice(i+1)
        break;
      }
    }
    setUserId(id);
      }, [])

  const getNewsFeed = async () => {
    try {
      const res = await fetch(`/dashboard/newsfeed/${userId}`, {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      setNewsFeed(parseData.newsFeed)
      setCommentCount(parseData.commentCount)

    } catch (err) {
        console.error(err.message);
    }
  }
  useEffect(() =>{
    getNewsFeed()
  },[userId])
  const changeBackground = (e) => {
    e.target.style.transform = 'scale(1.05)';
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
    <div style={{ padding: '0 2rem' }}>
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
          <h1 style={h1} onMouseEnter={changeBackground}
          onMouseLeave={changeBackgroundOut}>Flip - Flop: Feed</h1>
        </Link>
        <button style={toggleStyle} onClick={toggleTheme}>{currentTheme === 'dark' ? 'LIGHT ☀️' : '🌚 DARK'}</button>
      </div>
    </headers>
    <div style={parentContainer}>
      <div style={gallary}>
          {newsFeed.length !== 0 &&
            newsFeed[0].img_post_id !== null &&
            newsFeed.map(e => (
              <div style={ galleryItem }>
              <Link  to={`/individualPicture/${e.img_post_id}`} key={e.img_post_id} onMouseEnter={changeBackground}
              onMouseLeave={changeBackgroundOut}>
                <img style={avatar} src={e.profile_img} />
                <span style={avatarName}>{e.first_name}</span>
                <img style={ galleryImage } src={e.img} key={e.img_post_id} alt='user posted picture'/>
              </Link>
              </div>
            ))}
        </div>
    </div>
    <div style={{textAlign: 'center'}}>
        <p>&copy; MAURICO ACOSTA</p>
    </div>
    </div>
    </ThemeProvider>
  )
};
const header ={
  display: 'flex',
  justifyContent: 'center',
  borderBottom: '2px solid purple',
  height: '150px',
  borderBottom: '3px solid rgb(249, 167, 196)',
}
const h1 = {
  fontSize: '3rem',
  textAlign: 'center',
  fontFamily: 'Anton , sans-serif',
  marginTop: '15%'
}
const avatar = {
    width: '50px',
    height: '50px',
    borderRadius:' 50%',
    objectFit: 'cover',
    objectFosition: 'center right',
    boxShadow: 'rgba(128, 128, 128, 0.45) 5px 3px 11px 6px',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    margin: '.5rem',
    zIndex: '1',
    border: '2px solid rgb(249, 167, 196)'
};
const avatarName = {
  width: '35%',
  textAlign: 'center',
    objectFit: 'cover',
    boxShadow: 'rgba(128, 128, 128, 0.45) 5px 3px 11px 6px',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    marginLeft: '4rem',
    marginTop: '1rem',
    color: 'white',
    background: '#00000078',
    padding: '1%',
    borderRadius: '9%',
    zIndex: '1'
}
const parentContainer = {
  // backgroundColor: '#fbcbd4',
  maxWidth: '93.5rem',
    margin: '0 auto',
    padding: '0 2rem',
    marginTop: '2%'
};
const buttons = {
  border: '3px solid black',
  boxShadow: 'rgba(128, 128, 128, 0.45) 3px 3px 7px 2px',
  margin: '1%'
};

const gallary = {
  display: 'flex',
    flexWrap: 'wrap',
    margin: '-1rem -1rem',
    paddingBottom: '3rem',
    overflow: 'auto'
}
const galleryItem = {
  position: 'relative',
    flex: '1 0 22rem',
    margin: '.5rem',
    color: '#fff',
    cursor: 'pointer'
}
const galleryImage = {
  width: '100%',
    height: '100%',
    objectFit: 'cover'
};
const toggleStyle = {
  borderRadius: '15px',
    boxShadow: 'rgba(128, 128, 128, 0.45) 1px 2px 2px 2px',
    fontFamily: 'Balsamiq Sans, cursive',
    fontWeight: '900',
};

export default NewsFeed;
