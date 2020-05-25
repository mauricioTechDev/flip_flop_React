import React, { Fragment, useState } from "react";

const UserInfo = ({ individualUser }) => {

  return (
    <Fragment>
    <div style={parentContainer}>
        { individualUser.profile_img
          ? <span><img src={individualUser.profile_img} alt='User Profile' style={avatar}/></span>
          : <span><img src='https://via.placeholder.com/150' alt='User Profile' style={avatar}/></span>
        }
        <div style={{ alignSelf: 'center' }}>
          <h1 style={h1} className='h1'> { individualUser.first_name } {individualUser.last_name} </h1>
          <h2 style={h2} className='h2'>{ individualUser.about_me }</h2>
        </div>
    </div>
    </Fragment>
  )
};
const parentContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '2%'
};

const avatar = {
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
  fontFamily: 'Balsamiq Sans, cursive',
  borderRadius: '4%',
  // color: '#ffffff'
};
const h2 = {
  fontSize: '1.5rem',
textAlign: 'center',
fontFamily: 'Balsamiq Sans, cursive',
margin: 'auto',
// color: '#ffffff'
};

export default UserInfo;
