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

      const response = await fetch("/dashboard/profileImg", {
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
    <div style={imgParentContainer}>
    <span
      style={{ fontSize: '1.5rem',fontFamily: '-webkit-pictograph', marginBottom: '1%', marginTop: '3%' }}
      className='text-white'>
        Choose a file 👇 to add a picture 📸 to your timeline.
    </span>
        <form className="input-group2  w-10" encType="multipart/form-data" onSubmit={sumbitImg}>
          <input
            type="file"
            name="uploadImg"
            onChange={e => setUploadImg(e.target.files[0])}
            style={{width: '240px' }} />
            <button style={{ width: '100px'}} className="btn btn-success ">Add</button>
        </form>
      </div>
    </Fragment>

  )
};
const imgParentContainer = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  justifyContent: 'center',
  backgroundColor: '#fbcbd4',
  textAlign: 'center'
};

export default ImgFeedInput;
