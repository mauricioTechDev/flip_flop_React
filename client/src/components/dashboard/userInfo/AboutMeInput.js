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
      <span
        style={{ fontSize: '1.5rem',fontFamily: '-webkit-pictograph', marginBottom: '1%' }}
        className='text-white'>
          Customize your about me 💪 😎 👇
      </span>
      <form onSubmit={onSubmitForm}>
        <input
          value={aboutMe}
          onChange={e => setAbout(e.target.value)}
          style={{ height: '36px', borderRadius: '2px' }}
          placeHolder=' About Me' >
        </input>
        <button className="btn btn-success ">SUBMIT</button>
      </form>
      </div>
    </Fragment>
  )
};
const parentContainer = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  justifyContent: 'center',
  backgroundColor: '#fbcbd4',
  textAlign: 'center'
};

export default AboutMeInput;
