import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'

const Editprofile = ({ logout }) => {


  const changeBackground = (e) => {
    e.target.style.transform = 'scale(1.1)';
  }
  const changeBackgroundOut = (e) => {
    e.target.style.transform = ''
  }

  return(
    <div style={parentContainer}>
    <div>
      <header style={{ textAlign: 'center' }}>
        <div>
          <h1 style={h1} className='text-white'>Flip - Flop</h1>
        </div>
        <Link to='/dashboard' className="btn btn-warning btn-lg" to='/' style={buttons} onMouseEnter={changeBackground}
        onMouseLeave={changeBackgroundOut}>HOME</Link>
        <Link to={`/dashboard`} className="btn btn-warning btn-lg" style={buttons} onMouseEnter={changeBackground}
        onMouseLeave={changeBackgroundOut}>FEED</Link>
        <Link to={`/dashboard`} className="btn btn-warning btn-lg" style={buttons} onMouseEnter={changeBackground}
        onMouseLeave={changeBackgroundOut}>FRIENDS</Link>
        <Link to={`/editprofile`} className="btn btn-warning btn-lg" style={buttons} onMouseEnter={changeBackground}
        onMouseLeave={changeBackgroundOut}>EDIT PROFILE</Link>
        <button onClick={e => logout(e)} className="btn btn-warning btn-lg" style={buttons} onMouseEnter={changeBackground}
        onMouseLeave={changeBackgroundOut}>LOG OUT</button>
      </header>
    </div>
    <div>
      <p>This input for status</p>
      <p>inpot for avatar</p>
    </div>

    </div>
  )
}
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

export default Editprofile;
