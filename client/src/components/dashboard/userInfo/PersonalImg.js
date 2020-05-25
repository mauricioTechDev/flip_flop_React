import React, { Fragment, useState } from 'react';
import { Link } from "react-router-dom";


const PersonalImg = ({ userInfo }) => {
  const changeBackground = (e) => {
    e.target.style.transform = 'scale(1.1)';
  }
  const changeBackgroundOut = (e) => {
    e.target.style.transform = ''
  }
  return (
    <Fragment>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <h1 style={{borderTop: '1px solid #fffffff2', width: '43%', paddingTop: '.5rem', fontSize: '1rem'}}>🌐 POSTS</h1>
    </div>
    <div style={gallary}>
          {userInfo.length !== 0 &&
            userInfo[0].img_post_id !== null &&
            userInfo.map(e => (
              <div style={ galleryItem }>
                <Link to={`/dashboard/${e.img_post_id}`} key={e.img_post_id}>
                  <span style={avatarName}>{e.img_likes}❤️</span>
                  <img src={e.img} key={e.img_post_id} alt='user posted' style={ galleryImage } onMouseEnter={changeBackground}
                  onMouseLeave={changeBackgroundOut} />
                </Link>
              </div>
            ))}
      </div>
    </Fragment>

  )
};

const gallary = {
  display: 'flex',
    flexWrap: 'wrap',
    paddingBottom: '3rem',
    overflow: 'auto',
    paddingRight: '9.5%',
    paddingLeft: '9.5%',
};
const galleryItem = {
    flex: '1 0 22rem',
    margin: '.5rem',
    color: '#fff',
    cursor: 'pointer'
};
const galleryImage = {
  width: '100%',
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
    marginLeft: '4rem',
    marginTop: '1rem',
    background: '#00000078',
    padding: '1%',
    borderRadius: '9%',
    fontFamily: 'Balsamiq Sans, cursive',
    color: '#f9a7c4',
    zIndex: '1',
}

export default PersonalImg;
