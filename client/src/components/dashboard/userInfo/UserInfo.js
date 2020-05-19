import React, { Fragment, useState } from "react";

const UserInfo = ({ individualUser }) => {
  const changeBackground = (e) => {
    e.target.style.transform = 'rotate(10deg)';
  }
  const changeBackgroundOut = (e) => {
    e.target.style.transform = ''
  }

  return (
    <Fragment>
    <div style={parentContainer}>
        <h1 style={h1} className='h1 text-white'> { individualUser.first_name } </h1>

        { individualUser.profile_img
          ? <span><img src={individualUser.profile_img} alt='User Profile' style={avatar}
          onMouseEnter={changeBackground}
          onMouseLeave={changeBackgroundOut}/></span>
          : <span><img src='https://via.placeholder.com/150' alt='User Profile' style={avatar}/></span>
        }
        <h2 style={h2} className='h2 text-white'>{ individualUser.about_me }</h2>
    </div>
    </Fragment>
  )
};
const parentContainer = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  justifyContent: 'center',
  textAlign: 'center',
  background: '#ff910033'
};
const avatar = {
  width: '200px',
  height: '200px',
  borderRadius:' 50%',
  margin: '20px',
  objectFit: 'cover',
  objectFosition: 'center right',
  boxShadow: 'rgba(128, 128, 128, 0.45) 5px 3px 11px 6px'
};
const h1 = {
  marginTop: '5px',
  fontSize: '3rem',
  textAlign: 'center',
  fontFamily: '-webkit-pictograph',
  borderRadius: '4%'
};
const h2 = {
  fontSize: '2rem',
  textAlign: 'center',
  marginLeft: '15%',
  marginRight: '16%',
  fontFamily: '-webkit-pictograph',
  borderRadius: '4%'
};

export default UserInfo;
