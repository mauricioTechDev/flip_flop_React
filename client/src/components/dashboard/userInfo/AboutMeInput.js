import React, { Fragment, useState, useEffect } from "react";


const AboutMeInput = ({ setAvatarChange }) => {
  const [aboutMe, setAbout] = useState('')

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { aboutMe };
      const response = await fetch("/dashboard/aboutMe", {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json();
      if(parseResponse){
        setAvatarChange(true)
        setAbout('')
      }

    } catch (err) {
      console.error(err.message);
    }
  };


  return (
    <Fragment>
    <div style={parentContainer}>
    <div style={inputContainer}>
      <span
        style={{ fontSize: '1.5rem',fontFamily: '-webkit-pictograph', marginBottom: '1%', fontFamily: 'Balsamiq Sans, cursive', }}>
          About me 💪 😎 👇
      </span>
      <form onSubmit={onSubmitForm}>
        <input
          value={aboutMe}
          onChange={e => setAbout(e.target.value)}
          style={{ height: '36px', borderRadius: '20px' }}
          placeHolder=' About Me' >
        </input>
        <button style={button} className="btn btn-success ">SUBMIT</button>
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
  boxShadow: 'rgba(128, 128, 128, 0.45) 3px 3px 7px 2px',
  border: '1px solid black',
  borderRadius: '2%',
  width: '59rem',
  margin: 'auto',
}
const button = {
  fontFamily: 'Balsamiq Sans, cursive',
  fontWeight: '900',
  zIndex: '1',
  boxShadow: 'rgba(128, 128, 128, 0.45) 1px 2px 2px 2px',
  marginLeft: '4%',
  borderRadius: '15px'
}


export default AboutMeInput;
