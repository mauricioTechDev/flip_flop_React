import React, { Fragment, useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";


const NewsFeed = ({ setAuth, logout }) => {
  const [userId, setUserId] = useState('')
  const [newsFeed, setNewsFeed] = useState([]);
  const [commentCount, setCommentCount] = useState([]);


  let location = useLocation();
  let path = location.pathname;

  // ACTS LIKE COMPONENTDIDMOUTN BECOUASE OF BRACKETS AS SECOND PARAMATER
  useEffect(() => {
    let id;
    for(let i = path.length - 1; i > 0; i--){
      if(path[i] === '/'){
        id = path.slice(i+1)
        break;
      }
    }
    setUserId(id);
      }, [])

  const getNewsFeed = async () => {
    try {
      const res = await fetch(`/dashboard/newsfeed/${userId}`, {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      setNewsFeed(parseData.newsFeed)
      setCommentCount(parseData.commentCount)

    } catch (err) {
        console.error(err.message);
    }
  }

  useEffect(() =>{
    getNewsFeed()
  },[userId])
  const changeBackground = (e) => {
    e.target.style.transform = 'scale(1.1)';
  }
  const changeBackgroundOut = (e) => {
    e.target.style.transform = ''
  }
  console.log('NEWSFEED', newsFeed);
  return (
    <div style={{  backgroundColor: '#fbcbd4'}}>
    <div style={parentContainer}>
    <div>
      <header style={{ textAlign: 'center', marginBottom: '6%' }}>
        <div>
          <h1 style={h1} className='text-white'>Flip - Flop</h1>
          <h1 style={h1} className="text-white">NEWS FEED</h1>
        </div>
        <Link to='/dashboard' className="btn btn-warning btn-lg" to='/' style={buttons} onMouseEnter={changeBackground}
        onMouseLeave={changeBackgroundOut}>HOME</Link>
        <Link to={`/dashboard`} className="btn btn-warning btn-lg" style={buttons} onMouseEnter={changeBackground}
        onMouseLeave={changeBackgroundOut}>FEED</Link>
        <Link to={`/dashboard`} className="btn btn-warning btn-lg" style={buttons} onMouseEnter={changeBackground}
        onMouseLeave={changeBackgroundOut}>FRIENDS</Link>
        <Link to={`/editprofile`} className="btn btn-warning btn-lg" style={buttons} onMouseEnter={changeBackground}
        onMouseLeave={changeBackgroundOut}>EDIT PROFILE</Link>
        <button onClick={e => logout(e)} className="btn btn-warning btn-lg" style={buttons} onMouseEnter={changeBackground}
        onMouseLeave={changeBackgroundOut}>LOG OUT</button>
      </header>
    </div>

      <div style={gallary}>

          {newsFeed.length !== 0 &&
            newsFeed[0].img_post_id !== null &&
            newsFeed.map(e => (
              <div style={ galleryItem }>
              <Link  to={`/individualPicture/${e.img_post_id}`} key={e.img_post_id}>
                <img style={avatar} src={e.profile_img} />
                <span style={avatarName}>{e.first_name}</span>
                <img style={ galleryImage } src={e.img} key={e.img_post_id} alt='user posted picture'/>
              </Link>
              </div>
            ))}
        </div>
    </div>
    </div>
  )
};
const avatar = {
    width: '50px',
    height: '50px',
    borderRadius:' 50%',
    objectFit: 'cover',
    objectFosition: 'center right',
    boxShadow: 'rgba(128, 128, 128, 0.45) 5px 3px 11px 6px',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    margin: '.5rem'
};
const avatarName = {
  width: '14%',
    objectFit: 'cover',
    boxShadow: 'rgba(128, 128, 128, 0.45) 5px 3px 11px 6px',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    marginLeft: '4rem',
    marginTop: '1rem',
    color: 'white',
    background: '#00000078',
    padding: '1%',
    borderRadius: '9%',
}
const parentContainer = {
  backgroundColor: '#fbcbd4',
  maxWidth: '93.5rem',
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
}
const gallary = {
  display: 'flex',
    flexWrap: 'wrap',
    margin: '-1rem -1rem',
    paddingBottom: '3rem',
    overflow: 'auto'
}
const galleryItem = {
  position: 'relative',
    flex: '1 0 22rem',
    margin: '.5rem',
    color: '#fff',
    cursor: 'pointer'
}
const galleryImage = {
  width: '100%',
    height: '100%',
    objectFit: 'cover'
}

export default NewsFeed;
