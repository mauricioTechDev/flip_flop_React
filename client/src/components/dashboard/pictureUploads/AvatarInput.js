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
      <div className='d-flex mt-5 align-content-start '>
        <form className="input-group2  w-10" encType="multipart/form-data" onSubmit={submitAvatar}>
          <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            name="uploadedAvatar"
            onChange={e => setUploadedAvatar(e.target.files[0])} />
            <label className="custom-file-label" htmlFor="inputGroupFile04">{uploadedAvatar.name}</label>
            <button className="btn btn-success ">Add</button>
          </div>

        </form>
      </div>
    </Fragment>
  )
};

export default AvatarInput;
