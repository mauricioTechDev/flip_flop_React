import React, { Fragment, useState } from "react";


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
      <span
        style={{ fontSize: '1.5rem',fontFamily: '-webkit-pictograph', marginBottom: '1%', marginTop: '3%' }}
        className='text-white'>
          Choose a file 👇 to change your profile picture 📸
      </span>
        <form className="input-group2  w-10" encType="multipart/form-data" onSubmit={submitAvatar}>
          <input
            type="file"
            name="uploadedAvatar"
            onChange={e => setUploadedAvatar(e.target.files[0])}
            style={{width: '240px' }} />
            <button style={{ width: '100px'}} className="btn btn-success ">Add</button>
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
export default AvatarInput;
