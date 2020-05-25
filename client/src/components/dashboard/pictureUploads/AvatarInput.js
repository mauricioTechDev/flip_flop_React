import React, { Fragment, useState } from "react";

import { ThemeProvider } from 'styled-components';
import { useOnClickOutside } from '../../../hooks';
import { GlobalStyles } from '../../../global';
import { theme } from '../../../theme';
import { Burger, Menu } from '../burgerMenu';
import FocusLock from 'react-focus-lock';


const AvatarInput = ({ setAvatarChange }) => {
  const [uploadedAvatar, setUploadedAvatar] = useState('')

  const submitAvatar = async e => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      // I want to ad more than one header in post so I can send the Token
      // myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);
      const formdata = new FormData();
    formdata.append("upload", uploadedAvatar);

      const response = await fetch("/dashboard/avatar", {
        method: "POST",
        headers: myHeaders,
        body: formdata
      });

      const parseResponse = await response.json();

      setAvatarChange(true);
      setUploadedAvatar("");
    } catch (err) {
      console.error(err.message);
    }
  };


  return (
    <Fragment>

      <div style={parentContainer}>
      <div style={inputContainer}>
      <span
        style={{ fontSize: '1.5rem',fontFamily: 'Balsamiq Sans, cursive', marginBottom: '1%', marginTop: '3%' }}>
        Change 👇 your profile picture
      </span>
        <form className="input-group2  w-10" encType="multipart/form-data" onSubmit={submitAvatar} style={{ display: 'flex', justifyContent: 'center' }}>
          <label style={ addPic } className="btn btn-primary">
            📸  Picture
            <input
              type="file"
              name="uploadedAvatar"
              onChange={e => setUploadedAvatar(e.target.files[0])}
              style={{ visibility: 'hidden' }} />
          </label>
            <button style={button} className="btn btn-success ">Add</button>
        </form>
        </div>
      </div>
    </Fragment>
  )
};
const parentContainer = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  justifyContent: 'center',
  textAlign: 'center'
};
const inputContainer = {
    padding: '1%',
    borderRadius: '2%',
    margin: 'auto'
};
const addPic = {
  backgroundColor: '#0069d9',
  color: 'white',
  width: '34%',
  borderRadius: '15px',
  height: '38px',
  margin: '0',
  boxShadow: 'rgba(128, 128, 128, 0.45) 1px 2px 2px 2px',
  fontFamily: 'Balsamiq Sans, cursive',
  fontWeight: '900',
};
const button = {
  fontFamily: 'Balsamiq Sans, cursive',
  fontWeight: '900',
  zIndex: '1',
  boxShadow: 'rgba(128, 128, 128, 0.45) 1px 2px 2px 2px',
  marginLeft: '4%',
  borderRadius: '15px'
};
export default AvatarInput;
