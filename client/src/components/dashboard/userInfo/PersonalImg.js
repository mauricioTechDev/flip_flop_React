import React, { Fragment, useState } from 'react';
import { Link } from "react-router-dom";


const PersonalImg = ({ userInfo }) => {

  return (
    <Fragment>
    <div style={gallary}>
          {userInfo.length !== 0 &&
            userInfo[0].img_post_id !== null &&
            userInfo.map(e => (
              <div style={ galleryItem }>
                <Link to={`/dashboard/${e.img_post_id}`} key={e.img_post_id}>
                  <img src={e.img} key={e.img_post_id} alt='user posted' style={ galleryImage } />
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

export default PersonalImg;
