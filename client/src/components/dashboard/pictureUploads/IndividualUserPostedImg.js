import React, { Fragment, useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import Caption from './Caption'


const IndividualUserPostedImg = ({ setAuth, logout }) =>{
  const [imgId, setImgId] = useState('')
  const [img, setImg] = useState({})
  const [commentCount, setCommentCount] = useState('')
  const [individualUserImg, setIndividualUserImg] = useState([])
  const [userNames, setUserNames] = useState([])
  const [newCaption, setCaption] = useState(false)

  let location = useLocation();
  let path = location.pathname;
  // ACTS LIKE COMPONENTDIDMOUTN BECOUASE OF BRACKETS AS SECOND PARAMATER
  useEffect(() => {
    let id;
    for(let i = path.length - 1; i > 0; i--){
      if(path[i] == '/'){
        id = path.slice(i+1)
        break;
      }
    }
    setImgId(id);
      }, [])


  const getProfile = async () => {
    try {
      const res = await fetch(`/dashboard/individualUserImg/${imgId}`, {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      setCommentCount(parseData.commentCount)
      setIndividualUserImg(parseData.individualUserImg)
      setUserNames(parseData.setUserNames)
      setImg(parseData.img)

    } catch (err) {
      console.error(err.message);
    }
  };

  const deletePicture = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const res = await fetch(`/dashboard/deletePicture/${img.img_post_id}`, {
        method: "DELETE",
        headers: myHeaders
      });

      const parseData = await res.json();
      if(parseData){
        getProfile()
      }

    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
      }, [imgId])
  useEffect(() => {
    getProfile();
    setCaption(false);
      }, [newCaption])
    const caption =  img ? <h1 className='text-white'>{img.description}</h1> : <h1 className='text-white'>{'Caption'}</h1>

    const changeBackground = (e) => {
      e.target.style.transform = 'scale(1.1)';
    }
    const changeBackgroundOut = (e) => {
      e.target.style.transform = ''
    }

  return(
    <Fragment>
    <div style={parentContainer}>
    <div>
      <header style={{ textAlign: 'center', marginBottom: '1%', borderBottom: '2px solid gray' }}>
        <div>
          <h1 style={h1} className='text-white'>Flip - Flop</h1>
          <h1 style={h1} className="text-white">NEWS FEED</h1>
        </div>
        <Link to='/dashboard' className="btn btn-warning btn-lg" to='/' style={buttons} onMouseEnter={changeBackground}
        onMouseLeave={changeBackgroundOut}>HOME</Link>
        <Link to={`/dashboard/newsfeed/${individualUserImg.id_of_img_poster}`} className="btn btn-warning btn-lg" style={buttons} onMouseEnter={changeBackground}
        onMouseLeave={changeBackgroundOut}>FEED</Link>
        <Link to={`/dashboard`} className="btn btn-warning btn-lg" style={buttons} onMouseEnter={changeBackground}
        onMouseLeave={changeBackgroundOut}>FRIENDS</Link>
        <Link to={`/editprofile`} className="btn btn-warning btn-lg" style={buttons} onMouseEnter={changeBackground}
        onMouseLeave={changeBackgroundOut}>EDIT PROFILE</Link>
        <button onClick={e => logout(e)} className="btn btn-warning btn-lg" style={buttons} onMouseEnter={changeBackground}
        onMouseLeave={changeBackgroundOut}>LOG OUT</button>
      </header>
    </div>
    <div style={userInfoContainer}>
      { caption }
      <div>
      <button className="btn btn-danger mb-5 mt-5" onClick={deletePicture} >
        DELETE PICTURE
      </button>
      </div>
    </div>
      <div className="text-center">
        {
          img &&
          <img src={img.img } key={img.img_post_id} className="img-thumbnail rounded w-50"  alt='user posted picture'/>
        }

      </div>
      <div className="text-center text-white">
      {
        img &&
        <span>{img.img_likes}❤️</span>
      }
      </div>
      <div className="text-center" style={{ padding: '2%' }}>
        <Caption setCaption={setCaption} />
      </div>
      </div>

    </Fragment>
  )
};
const parentContainer = {
  backgroundColor: '#fbcbd4',
    margin: '0 auto',
    padding: '0 2rem'
};
const buttons = {
  border: '3px solid black',
  boxShadow: 'rgba(128, 128, 128, 0.45) 3px 3px 7px 2px',
  margin: '1%'
};
const h1 = {
  fontSize: '3rem',
  textAlign: 'center',
  fontFamily: '-webkit-pictograph',
  borderRadius: '4%'
};
const userInfoContainer = {
  display: 'flex',
  flexDirection: 'column',
    overflow: 'auto',
    textAlign: 'center'
}

export default IndividualUserPostedImg;
