import React, { Fragment, useState } from "react";
import '../../../index.css'

const ImgFeedInput = ({ setUploadNewImg }) => {
  const [uploadImg, setUploadImg] = useState('')
  // const [addPic, setAddPick] = useState(false)

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
    <div style={imgContainer} >
    <span
      style={{ fontSize: '1.5rem',fontFamily: 'Balsamiq Sans, cursive', marginBottom: '1%'}}>
        Add a picture👇 to your timeline
    </span>
      <div class="input-group" style={{ display: 'flex', justifyContent: 'center' }}>
        <form encType="multipart/form-data" onSubmit={sumbitImg} style={{ display: 'flex', justifyContent: 'center' }}>
          <label style={ addPic } className="btn btn-primary">
          📸  Add a picture
            <input
              type="file"
              name="uploadImg"
              onChange={e => setUploadImg(e.target.files[0])}
              style={{ visibility: 'hidden' }}
              />
          </label>
            <button
              className="btn btn-success"
              style={ button }>Submit</button>
        </form>
        </div>
        </div>
      </div>
    </Fragment>
  )
};

const imgParentContainer = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  justifyContent: 'center',
  textAlign: 'center',
  marginBottom: '1%'
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
}

const imgContainer = {
  paddingTop: '2%',
  paddingBottom: '2%',
  borderRadius: '2%',
  marginTop: '3%',
};

const button = {
  fontFamily: 'Balsamiq Sans, cursive',
  fontWeight: '900',
  zIndex: '1',
  boxShadow: 'rgba(128, 128, 128, 0.45) 1px 2px 2px 2px',
  marginLeft: '4%',
  borderRadius: '15px'
}

export default ImgFeedInput;
