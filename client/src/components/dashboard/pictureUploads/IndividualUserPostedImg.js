import React, { Fragment, useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import Caption from './Caption'


const IndividualUserPostedImg = ({ setAuth }) =>{
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
      const res = await fetch(`http://localhost:5000/dashboard/individualUserImg/${imgId}`, {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      console.log(parseData);
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
      // I want to ad more than one header in post so I can send the Token
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);
      const res = await fetch(`http://localhost:5000/dashboard/deletePicture/${img.img_post_id}`, {
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


  return(
    <Fragment>
      <Link className="btn btn-warning mb-5 mt-5" to='/dashboard'>BACK</Link>
      { caption }
      <button className="btn btn-danger mb-5 mt-5" onClick={deletePicture} >
        DELETE PICTURE
      </button>
      <div class="text-center">
        {
          img &&
          <img src={img.img } key={img.img_post_id} class="img-thumbnail rounded w-50"  alt='user posted picture'/>
        }

      </div>
      <div class="text-center mt-5">
        <Caption setCaption={setCaption} />
      </div>



    </Fragment>
  )
};

export default IndividualUserPostedImg;
