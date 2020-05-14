import React, { Fragment, useState } from "react";

const ImgFeedInput = ({ setUploadNewImg }) => {
  const [uploadImg, setUploadImg] = useState('')

  const sumbitImg = async e => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();
      myHeaders.append("jwt_token", localStorage.token);

      const formdata = new FormData();
      formdata.append("upload", uploadImg);

      const response = await fetch("http://localhost:5000/dashboard/profileImg", {
        method: "POST",
        headers: myHeaders,
        body: formdata
      });

      const parseResponse = await response.json();

      setUploadNewImg(true);
      setUploadImg("");

    } catch (err) {
      console.error(err.message);
    }
  }



  return (
    <Fragment>
      <div className='text-center '>
        <form className="input-group2  w-10" encType="multipart/form-data" onSubmit={sumbitImg}>
          <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            name="uploadImg"
            onChange={e => setUploadImg(e.target.files[0])} />
            <label className="custom-file-label" htmlFor="inputGroupFile04">{uploadImg.name}</label>
          </div>
          <div className="input-group-append">
            <button className="btn btn-success ">Add</button>
          </div>
        </form>
      </div>
    </Fragment>

  )
};

export default ImgFeedInput;
