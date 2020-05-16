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
      <span className='text-white'>Add/Edit About Me</span>
      <form onSubmit={onSubmitForm}>
        <input value={aboutMe} onChange={e => setAbout(e.target.value)} ></input>
        <button>SUBMIT</button>
      </form>
    </Fragment>
  )
};

export default AboutMeInput;
